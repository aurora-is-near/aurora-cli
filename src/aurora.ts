#!/usr/bin/env node
/* This is free and unencumbered software released into the public domain. */

import {
  AccountID,
  Address,
  ConnectEnv,
  Engine,
  base58ToHex,
  formatU256,
} from '@aurora-is-near/engine';
import { program } from 'commander';
import { readFileSync } from 'fs';
const { Table } = require('console-table-printer');

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends ConnectEnv {}
  }
}

main(process.argv, process.env);

async function main(argv: string[], env: NodeJS.ProcessEnv) {
  program
    .option('-d, --debug', 'enable debug output')
    .option('-v, --verbose', 'enable verbose output')
    .option(
      '--network <network>',
      'specify NEAR network ID',
      env.NEAR_ENV || 'local'
    )
    .option('--endpoint <url>', 'specify NEAR RPC endpoint URL', env.NEAR_URL)
    .option(
      '--engine <account>',
      'specify Aurora Engine account ID',
      env.AURORA_ENGINE
    )
    .option(
      '--signer <account>',
      'specify signer account ID',
      env.NEAR_MASTER_ACCOUNT || 'test.near'
    );

  program
    .command('install <contract>')
    .alias('upgrade')
    .option('--chain <id>', 'specify EVM chain ID', '0')
    .option('--owner <account>', 'specify owner account ID', '')
    .option('--bridge-prover <account>', 'specify bridge prover account ID', '')
    .option(
      '--upgrade-delay <blocks>',
      'specify upgrade delay block count',
      '0'
    )
    .action(async (contractPath, options, command) => {
      const [config, engine] = await loadConfig(command, options, env);
      const contractCode = readFileSync(contractPath);
      const p = new Table();
      // TODO: combine these both into a single transaction:
      const transactionID1 = (await engine.install(contractCode)).unwrap();
      p.addRow({ Type: "Install", Transaction_ID: transactionID1 });
      const transactionID2 = (await engine.initialize(config)).unwrap();
      p.addRow({ Type: "Initialize", Transaction_ID: transactionID2 });
      if (config.verbose || config.debug) p.printTable();
    });

  program
    .command('initialize')
    .alias('init')
    .option('--chain <id>', 'specify EVM chain ID', '0')
    .option('--owner <account>', 'specify owner account ID', '')
    .option('--bridge-prover <account>', 'specify bridge prover account ID', '')
    .option(
      '--upgrade-delay <blocks>',
      'specify upgrade delay block count',
      '0'
    )
    .action(async (options, command) => {
      const [config, engine] = await loadConfig(command, options, env);
      const transactionID = (await engine.initialize(config)).unwrap();
      const p = new Table();
      p.addRow({ Transaction_ID: transactionID });
      if (config.verbose || config.debug) p.printTable();
    });

  program //
    .command('get-version')
    .action(async (options, command) => {
      const [_, engine] = await loadConfig(command, options, env);
      const result = (await engine.getVersion()).unwrap();
      const version = result.substring(0, result.length - 1);
      console.log(version);
    });

  program //
    .command('get-owner')
    .action(async (options, command) => {
      const [_, engine] = await loadConfig(command, options, env);
      const accountID = (await engine.getOwner()).unwrap();
      const p = new Table();
      p.addRow({ engine_owner: accountID.toString() });
      p.printTable();
    });

  program //
    .command('get-bridge-prover')
    .action(async (options, command) => {
      const [_, engine] = await loadConfig(command, options, env);
      const accountID = (await engine.getBridgeProvider()).unwrap();
      const p = new Table();
      p.addRow({ bridge_prover: accountID.toString() });
      p.printTable();
    });

  program
    .command('get-chain-id')
    .alias('get-chain')
    .action(async (options, command) => {
      const [_, engine] = await loadConfig(command, options, env);
      const chainID = (await engine.getChainID()).unwrap();
      const p = new Table();
      p.addRow({ chain_id: chainID.toString() });
      p.printTable();
    });

  program //
    .command('get-upgrade-index')
    .action(async (_options, _command) => {
      // TODO
    });

  program //
    .command('stage-upgrade')
    .action(async (_options, _command) => {
      // TODO
    });

  program //
    .command('deploy-upgrade')
    .action(async (_options, _command) => {
      // TODO
    });

  program
    .command('deploy-code <bytecode>')
    .alias('deploy')
    .action(async (input, options, command) => {
      const [_, engine] = await loadConfig(command, options, env);
      const address = (await engine.deployCode(readInput(input))).unwrap();
      const p = new Table();
      p.addRow({ contract: address.toString() });
      p.printTable();
    });

  program
    .command('call <address> <input>')
    .action(async (address, input, options, command) => {
      const [_, engine] = await loadConfig(command, options, env);
      const address_ = Address.parse(readInput(address)).unwrap();
      const output = (await engine.call(address_, readInput(input))).unwrap();
      const p = new Table();
      p.addRow(
        { contract: address, inputs: input, output: `0x${output ? Buffer.from(output).toString('hex') : ''}` }
      );
      p.printTable();
    });

  program
    .command('meta-call') // TODO
    .action(async (_options, _command) => {
      // TODO
    });

  program
    .command('view <address> <input>')
    .option(
      '--sender <address>',
      'specify the sender address',
      '0x0000000000000000000000000000000000000000'
    ) // TODO
    .option('--amount <value>', 'attach an ETH amount', '0')
    .action(async (address, input, options, command) => {
      const [config, engine] = await loadConfig(command, options, env);
      const senderAddress = Address.parse(options.sender).unwrap();
      const address_ = Address.parse(readInput(address)).unwrap();
      const output = (
        await engine.view(
          senderAddress,
          address_,
          BigInt(config.amount),
          readInput(input)
        )
      ).unwrap();
      const p = new Table();
      p.addRow(
        { contract: address, inputs: input, output: `0x${output ? Buffer.from(output).toString('hex') : ''}` }
      );
      p.printTable();
    });

  program
    .command('get-code <address>')
    .action(async (address, options, command) => {
      const [_, engine] = await loadConfig(command, options, env);
      const address_ = Address.parse(readInput(address)).unwrap();
      const code = (await engine.getCode(address_)).unwrap();
      const p = new Table();
      p.addRow(
        { contract: address, code: `0x${code ? Buffer.from(code).toString('hex') : ''}` }
      );
      p.printTable();
    });

  program
    .command('get-balance <address>')
    .action(async (address, options, command) => {
      const [_, engine] = await loadConfig(command, options, env);
      const address_ = Address.parse(readInput(address)).unwrap();
      const balance = (await engine.getBalance(address_)).unwrap();
      const p = new Table();
      p.addRow(
        { address: address, balance: balance.toString() }
      );
      p.printTable();
    });

  program
    .command('get-nonce <address>')
    .action(async (address, options, command) => {
      const [_, engine] = await loadConfig(command, options, env);
      const address_ = Address.parse(readInput(address)).unwrap();
      const nonce = (await engine.getNonce(address_)).unwrap();
      const p = new Table();
      p.addRow(
        { address: address, nonce: nonce.toString() }
      );
      p.printTable();
    });

  program
    .command('get-storage-at <address> <key>')
    .alias('get-storage')
    .action(async (address, key, options, command) => {
      const [_, engine] = await loadConfig(command, options, env);
      const address_ = Address.parse(readInput(address)).unwrap();
      const value = (await engine.getStorageAt(address_, key)).unwrap();
      const p = new Table();
      p.addRow(
        { contract: address, key: key, value: value.toString() }
      );
      p.printTable();
    });

  program
    .command('begin-chain <id>')
    .action(async (_chain_id, _options, _command) => {
      // TODO
    });

  program
    .command('begin-block <hash>') // TODO
    .action(async (_hash, _options, _command) => {
      // TODO
    });

  program //
    .command('dump-storage')
    .action(async (options, command) => {
      const [config, engine] = await loadConfig(command, options, env);
      const result = (await engine.getStorage()).unwrap();
      if (config.debug) {
        console.log('Storage:', result);
      } else {
        for (const record of result.values()) {
          const { address, nonce, balance, code, storage } = record;
          const p = new Table();
          p.addRow(
            { address: address, nonce: nonce, balance: balance, code: code ? code.length : 0 }
          );
          p.printTable();

          const p2 = new Table();
          for (const [k, v] of storage) {
            p2.addRow({ key: formatU256(k), value: formatU256(v) });
          }
          p.printTable();
        }
      }
    });

  program
    .command('encode-address <account>')
    .action(async (account: string, _options, _command) => {
      const p = new Table();
      p.addRow(
        { account: account, encoded: AccountID.parse(account).unwrap().toAddress().toString() }
      );
      p.printTable();
    });

  program
    .command('encode-hash <base58>')
    .aliases(['encode-block-id', 'encode-transaction-id'])
    .action(async (hash: string, _options, _command) => {
      const p = new Table();
      p.addRow(
        { hash: hash, encoded: base58ToHex(hash) }
      );
      p.printTable();
    });

  program.parse(argv);
}

async function loadConfig(
  command: any,
  options: any,
  env: ConnectEnv
): Promise<[any, Engine]> {
  const config = { ...command.parent.opts(), ...options };
  if (config.debug) console.debug('Options:', config);
  const engine = await Engine.connect(
    {
      network: config.network,
      endpoint: config.endpoint,
      contract: config.engine,
      signer: config.signer,
    },
    env
  );
  return [config, engine];
}

function readInput(input: string): string {
  try {
    return input[0] == '@'
      ? readFileSync(input.substring(1), 'ascii').trim()
      : input;
  } catch (err) {
    console.error(err.toString());
    process.exit(-1);
  }
}
