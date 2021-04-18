#!/usr/bin/env node
/* This is free and unencumbered software released into the public domain. */
import { Account, Engine, formatU256 } from '@aurora-is-near/engine';
import { program } from 'commander';
import { readFileSync } from 'fs';
main(process.argv, process.env);
async function main(argv, env) {
    program
        .option('-d, --debug', 'enable debug output')
        .option('-v, --verbose', 'enable verbose output')
        .option("--network <network>", "specify NEAR network ID", env.NEAR_ENV || 'local')
        .option("--endpoint <url>", "specify NEAR RPC endpoint URL", env.NEAR_URL)
        .option("--engine <account>", "specify Aurora Engine account ID", env.AURORA_ENGINE)
        .option("--signer <account>", "specify signer account ID", env.NEAR_MASTER_ACCOUNT || 'test.near');
    program
        .command('install <contract>')
        .alias('upgrade')
        .option("--chain <id>", "specify EVM chain ID", '0')
        .option("--owner <account>", "specify owner account ID", '')
        .option("--bridge-prover <account>", "specify bridge prover account ID", '')
        .option("--upgrade-delay <blocks>", "specify upgrade delay block count", '0')
        .action(async (contractPath, options, command) => {
        const [config, engine] = await loadConfig(command, options, env);
        const contractCode = await readFileSync(contractPath);
        // TODO: combine these both into a single transaction:
        const transactionID1 = (await engine.install(contractCode)).unwrap();
        if (config.verbose || config.debug)
            console.log(transactionID1);
        const transactionID2 = (await engine.initialize(config)).unwrap();
        if (config.verbose || config.debug)
            console.log(transactionID2);
    });
    program
        .command('initialize')
        .alias('init')
        .option("--chain <id>", "specify EVM chain ID", '0')
        .option("--owner <account>", "specify owner account ID", '')
        .option("--bridge-prover <account>", "specify bridge prover account ID", '')
        .option("--upgrade-delay <blocks>", "specify upgrade delay block count", '0')
        .action(async (options, command) => {
        const [config, engine] = await loadConfig(command, options, env);
        const transactionID = (await engine.initialize(config)).unwrap();
        if (config.verbose || config.debug)
            console.log(transactionID);
    });
    program
        .command('get-version')
        .alias('get_version')
        .action(async (options, command) => {
        const [_, engine] = await loadConfig(command, options, env);
        const result = (await engine.getVersion()).unwrap();
        const version = result.substring(0, result.length - 1);
        console.log(version);
    });
    program
        .command('get-owner')
        .alias('get_owner')
        .action(async (options, command) => {
        const [_, engine] = await loadConfig(command, options, env);
        const accountID = (await engine.getOwner()).unwrap();
        console.log(accountID);
    });
    program
        .command('get-bridge-provider')
        .alias('get_bridge_provider')
        .action(async (options, command) => {
        const [_, engine] = await loadConfig(command, options, env);
        const accountID = (await engine.getBridgeProvider()).unwrap();
        console.log(accountID);
    });
    program
        .command('get-chain-id')
        .aliases(['get_chain_id', 'get-chain', 'get_chain'])
        .action(async (options, command) => {
        const [_, engine] = await loadConfig(command, options, env);
        const chainID = (await engine.getChainID()).unwrap();
        console.log(chainID.toString());
    });
    program
        .command('get-upgrade-index')
        .alias('get_upgrade_index')
        .action(async (_options, _command) => {
        // TODO
    });
    program
        .command('stage-upgrade')
        .alias('stage_upgrade')
        .action(async (_options, _command) => {
        // TODO
    });
    program
        .command('deploy-upgrade')
        .alias('deploy_upgrade')
        .action(async (_options, _command) => {
        // TODO
    });
    program
        .command('deploy-code <bytecode>')
        .aliases(['deploy', 'deploy_code'])
        .action(async (input, options, command) => {
        const [_, engine] = await loadConfig(command, options, env);
        const address = (await engine.deployCode(readInput(input))).unwrap();
        console.log(address);
    });
    program
        .command('call <address> <input>')
        .action(async (address, input, options, command) => {
        const [_, engine] = await loadConfig(command, options, env);
        const output = (await engine.call(readInput(address), readInput(input))).unwrap();
        console.log(`0x${output ? Buffer.from(output).toString('hex') : ''}`);
    });
    program
        .command('raw-call <input>')
        .alias('raw_call')
        .action(async (_input, _options, _command) => {
        // TODO
    });
    program
        .command('meta-call') // TODO
        .alias('meta_call')
        .action(async (_options, _command) => {
        // TODO
    });
    program
        .command('view <address> <input>')
        .option("--sender <address>", "specify the sender address", '0x0000000000000000000000000000000000000000') // TODO
        .option("--amount <value>", "attach an ETH amount", '0')
        .action(async (address, input, options, command) => {
        const [config, engine] = await loadConfig(command, options, env);
        const output = (await engine.view(options.sender, readInput(address), BigInt(config.amount), readInput(input))).unwrap();
        console.log(`0x${output ? Buffer.from(output).toString('hex') : ''}`);
    });
    program
        .command('get-code <address>')
        .alias('get_code')
        .action(async (address, options, command) => {
        const [_, engine] = await loadConfig(command, options, env);
        const code = (await engine.getCode(readInput(address))).unwrap();
        console.log(`0x${code ? Buffer.from(code).toString('hex') : ''}`);
    });
    program
        .command('get-balance <address>')
        .alias('get_balance')
        .action(async (address, options, command) => {
        const [_, engine] = await loadConfig(command, options, env);
        const balance = (await engine.getBalance(readInput(address))).unwrap();
        console.log(balance.toString());
    });
    program
        .command('get-nonce <address>')
        .alias('get_nonce')
        .action(async (address, options, command) => {
        const [_, engine] = await loadConfig(command, options, env);
        const nonce = (await engine.getNonce(readInput(address))).unwrap();
        console.log(nonce.toString());
    });
    program
        .command('get-storage-at <address> <key>')
        .aliases(['get_storage_at', 'get-storage', 'get_storage'])
        .action(async (address, key, options, command) => {
        const [_, engine] = await loadConfig(command, options, env);
        const value = (await engine.getStorageAt(readInput(address), key)).unwrap();
        console.log(value.toString());
    });
    program
        .command('begin-chain <id>')
        .alias('begin_chain')
        .action(async (_chain_id, _options, _command) => {
        // TODO
    });
    program
        .command('begin-block <hash>') // TODO
        .alias('begin_block')
        .action(async (_hash, _options, _command) => {
        // TODO
    });
    program
        .command('dump-storage')
        .alias('dump_storage')
        .action(async (options, command) => {
        const [config, engine] = await loadConfig(command, options, env);
        const result = (await engine.getStorage()).unwrap();
        if (config.debug) {
            console.log("Storage:", result);
        }
        else {
            for (const record of result.values()) {
                const { address, nonce, balance, code, storage } = record;
                console.log(`${address} nonce=${nonce} balance=${balance} code=${code ? code.length : 0}B`);
                for (const [k, v] of storage) {
                    console.log(`  ${formatU256(k)} ${formatU256(v)}`);
                }
            }
        }
    });
    program
        .command('encode-address <account>')
        .action(async (account, _options, _command) => {
        console.log(Account.parse(account).unwrap().toAddress());
    });
    program.parse(argv);
}
async function loadConfig(command, options, env) {
    const config = { ...command.parent.opts(), ...options };
    if (config.debug)
        console.debug("Options:", config);
    const engine = await Engine.connect({
        network: config.network,
        endpoint: config.endpoint,
        contract: config.engine,
        signer: config.signer,
    }, env);
    return [config, engine];
}
function readInput(input) {
    try {
        return (input[0] == '@') ? readFileSync(input.substring(1), 'ascii').trim() : input;
    }
    catch (err) {
        console.error(err.toString());
        process.exit(-1);
    }
}
