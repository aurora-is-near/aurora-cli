#!/usr/bin/env node
/* This is free and unencumbered software released into the public domain. */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Engine, KeyPair } from '@aurora-is-near/engine';
import { program } from 'commander';
import { existsSync, readFileSync } from 'fs';
main(process.argv, process.env);
function main(argv, env) {
    return __awaiter(this, void 0, void 0, function* () {
        program
            .option('-d, --debug', 'enable debug output')
            .option('-v, --verbose', 'enable verbose output')
            .option("--signer <account>", "specify signer master account ID", env.NEAR_MASTER_ACCOUNT || 'test.near')
            .option("--evm <account>", "specify EVM contract account ID", env.NEAR_EVM_ACCOUNT || 'aurora.test.near');
        program
            .command('install <contract>')
            .option("--chain <id>", "specify EVM chain ID", '0')
            .option("--owner <account>", "specify owner account ID", '')
            .option("--bridge-prover <account>", "specify bridge prover account ID", '')
            .option("--upgrade-delay <blocks>", "specify upgrade delay block count", '0')
            .action((contractPath, options, command) => __awaiter(this, void 0, void 0, function* () {
            const config = Object.assign(Object.assign({}, command.parent.opts()), options);
            if (config.debug)
                console.debug("Options:", config);
            const engine = yield Engine.connect(config, env);
            loadLocalKeys(engine.keyStore, config, env);
            const contractCode = yield readFileSync(contractPath);
            const transactionID = yield engine.install(contractCode);
            if (config.verbose || config.debug)
                console.log(transactionID);
        }));
        program
            .command('init')
            .option("--chain <id>", "specify EVM chain ID", '0')
            .option("--owner <account>", "specify owner account ID", '')
            .option("--bridge-prover <account>", "specify bridge prover account ID", '')
            .option("--upgrade-delay <blocks>", "specify upgrade delay block count", '0')
            .action((options, command) => __awaiter(this, void 0, void 0, function* () {
            const config = Object.assign(Object.assign({}, command.parent.opts()), options);
            if (config.debug)
                console.debug("Options:", config);
            const engine = yield Engine.connect(config, env);
            const outcome = yield engine.initialize(config);
            if (config.debug)
                console.debug("Outcome:", outcome);
        }));
        program
            .command('get-version')
            .alias('get_version')
            .action((options, command) => __awaiter(this, void 0, void 0, function* () {
            const config = Object.assign(Object.assign({}, command.parent.opts()), options);
            if (config.debug)
                console.debug("Options:", config);
            const engine = yield Engine.connect(config, env);
            const result = yield engine.getVersion();
            const version = result.substring(0, result.length - 1);
            console.log(version);
        }));
        program
            .command('get-owner')
            .alias('get_owner')
            .action((options, command) => __awaiter(this, void 0, void 0, function* () {
            const config = Object.assign(Object.assign({}, command.parent.opts()), options);
            if (config.debug)
                console.debug("Options:", config);
            const engine = yield Engine.connect(config, env);
            const accountID = yield engine.getOwner();
            console.log(accountID);
        }));
        program
            .command('get-bridge-provider')
            .alias('get_bridge_provider')
            .action((options, command) => __awaiter(this, void 0, void 0, function* () {
            const config = Object.assign(Object.assign({}, command.parent.opts()), options);
            if (config.debug)
                console.debug("Options:", config);
            const engine = yield Engine.connect(config, env);
            const accountID = yield engine.getBridgeProvider();
            console.log(accountID);
        }));
        program
            .command('get-chain-id')
            .aliases(['get_chain_id', 'get-chain', 'get_chain'])
            .action((options, command) => __awaiter(this, void 0, void 0, function* () {
            const config = Object.assign(Object.assign({}, command.parent.opts()), options);
            if (config.debug)
                console.debug("Options:", config);
            const engine = yield Engine.connect(config, env);
            const chainID = yield engine.getChainID();
            console.log(chainID.toString());
        }));
        program
            .command('get-upgrade-index')
            .alias('get_upgrade_index')
            .action((_options, _command) => __awaiter(this, void 0, void 0, function* () {
            // TODO
        }));
        program
            .command('stage-upgrade')
            .alias('stage_upgrade')
            .action((_options, _command) => __awaiter(this, void 0, void 0, function* () {
            // TODO
        }));
        program
            .command('deploy-upgrade')
            .alias('deploy_upgrade')
            .action((_options, _command) => __awaiter(this, void 0, void 0, function* () {
            // TODO
        }));
        program
            .command('deploy-code <bytecode>')
            .alias('deploy_code')
            .action((input, options, command) => __awaiter(this, void 0, void 0, function* () {
            const config = Object.assign(Object.assign({}, command.parent.opts()), options);
            if (config.debug)
                console.debug("Options:", config);
            const engine = yield Engine.connect(config, env);
            const address = yield engine.deployCode(readInput(input));
            console.log(address);
        }));
        program
            .command('call <address> <input>')
            .action((address, input, options, command) => __awaiter(this, void 0, void 0, function* () {
            const config = Object.assign(Object.assign({}, command.parent.opts()), options);
            if (config.debug)
                console.debug("Options:", config);
            const engine = yield Engine.connect(config, env);
            const output = yield engine.call(readInput(address), readInput(input));
            console.log(`0x${output ? Buffer.from(output).toString('hex') : ''}`);
        }));
        program
            .command('raw-call <input>')
            .alias('raw_call')
            .action((_input, _options, _command) => __awaiter(this, void 0, void 0, function* () {
            // TODO
        }));
        program
            .command('meta-call') // TODO
            .alias('meta_call')
            .action((_options, _command) => __awaiter(this, void 0, void 0, function* () {
            // TODO
        }));
        program
            .command('view <address> <input>')
            .option("--sender <address>", "specify the sender address", '0x0000000000000000000000000000000000000000') // TODO
            .option("--amount <value>", "attach an ETH amount", '0')
            .action((address, input, options, command) => __awaiter(this, void 0, void 0, function* () {
            const config = Object.assign(Object.assign({}, command.parent.opts()), options);
            if (config.debug)
                console.debug("Options:", config);
            const engine = yield Engine.connect(config, env);
            const output = yield engine.view(options.sender, readInput(address), BigInt(config.amount), readInput(input));
            console.log(`0x${output ? Buffer.from(output).toString('hex') : ''}`);
        }));
        program
            .command('get-code <address>')
            .alias('get_code')
            .action((address, options, command) => __awaiter(this, void 0, void 0, function* () {
            const config = Object.assign(Object.assign({}, command.parent.opts()), options);
            if (config.debug)
                console.debug("Options:", config);
            const engine = yield Engine.connect(config, env);
            const code = yield engine.getCode(readInput(address));
            console.log(`0x${code ? Buffer.from(code).toString('hex') : ''}`);
        }));
        program
            .command('get-balance <address>')
            .alias('get_balance')
            .action((address, options, command) => __awaiter(this, void 0, void 0, function* () {
            const config = Object.assign(Object.assign({}, command.parent.opts()), options);
            if (config.debug)
                console.debug("Options:", config);
            const engine = yield Engine.connect(config, env);
            const balance = yield engine.getBalance(readInput(address));
            console.log(balance.toString());
        }));
        program
            .command('get-nonce <address>')
            .alias('get_nonce')
            .action((address, options, command) => __awaiter(this, void 0, void 0, function* () {
            const config = Object.assign(Object.assign({}, command.parent.opts()), options);
            if (config.debug)
                console.debug("Options:", config);
            const engine = yield Engine.connect(config, env);
            const nonce = yield engine.getNonce(readInput(address));
            console.log(nonce.toString());
        }));
        program
            .command('get-storage-at <address> <key>')
            .aliases(['get_storage_at', 'get-storage', 'get_storage'])
            .action((address, key, options, command) => __awaiter(this, void 0, void 0, function* () {
            const config = Object.assign(Object.assign({}, command.parent.opts()), options);
            if (config.debug)
                console.debug("Options:", config);
            const engine = yield Engine.connect(config, env);
            const value = yield engine.getStorageAt(readInput(address), key);
            console.log(value.toString());
        }));
        program
            .command('begin-chain <id>')
            .alias('begin_chain')
            .action((chain_id, options, command) => __awaiter(this, void 0, void 0, function* () {
            // TODO
        }));
        program
            .command('begin-block <hash>') // TODO
            .alias('begin_block')
            .action((hash, options, command) => __awaiter(this, void 0, void 0, function* () {
            // TODO
        }));
        program.parse(process.argv);
    });
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
function loadLocalKeys(keyStore, options, env) {
    if (env && env.HOME) {
        const localValidatorKeyPath = `${env.HOME}/.near/validator_key.json`;
        if (existsSync(localValidatorKeyPath)) {
            const [accountID, keyPair] = loadKeyFile(localValidatorKeyPath);
            keyStore.setKey('local', accountID, keyPair);
        }
    }
}
function loadKeyFile(keyFilePath) {
    const keyJSON = JSON.parse(readFileSync(keyFilePath, 'utf8'));
    const keyPair = KeyPair.fromString(keyJSON.private_key || keyJSON.secret_key);
    return [keyJSON.account_id, keyPair];
}
