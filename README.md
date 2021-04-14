# Aurora Engine Command-Line Interface (CLI)

[![Project license](https://img.shields.io/badge/License-Public%20Domain-blue.svg)](https://creativecommons.org/publicdomain/zero/1.0/)
[![Discord](https://img.shields.io/discord/490367152054992913?label=Discord)](https://discord.gg/jNjHYUF8vw)

## Prerequisites

- Node.js (v14+)

## Installation

```shell
npm install -g aurora-is-near/aurora-cli
```

## Reference

### `aurora help`

```console
$ aurora help
Usage: aurora [options] [command]

Options:
  -d, --debug                                    enable debug output
  -v, --verbose                                  enable verbose output
  --network <network>                            specify NEAR network ID (default: "local")
  --endpoint <url>                               specify NEAR RPC endpoint URL
  --engine <account>                             specify Aurora Engine account ID
  --signer <account>                             specify signer account ID (default: "test.near")
  -h, --help                                     display help for command

Commands:
  install|upgrade [options] <contract>
  initialize|init [options]
  get-version|get_version
  get-owner|get_owner
  get-bridge-provider|get_bridge_provider
  get-chain-id|get_chain_id
  get-upgrade-index|get_upgrade_index
  stage-upgrade|stage_upgrade
  deploy-upgrade|deploy_upgrade
  deploy-code|deploy <bytecode>
  call <address> <input>
  raw-call|raw_call <input>
  meta-call|meta_call
  view [options] <address> <input>
  get-code|get_code <address>
  get-balance|get_balance <address>
  get-nonce|get_nonce <address>
  get-storage-at|get_storage_at <address> <key>
  begin-chain|begin_chain <id>
  begin-block|begin_block <hash>
  dump-storage|dump_storage
  help [command]                                 display help for command
```

### `aurora install`

```console
$ aurora install -h
Usage: aurora install|upgrade [options] <contract>

Options:
  --chain <id>               specify EVM chain ID (default: "0")
  --owner <account>          specify owner account ID (default: "")
  --bridge-prover <account>  specify bridge prover account ID (default: "")
  --upgrade-delay <blocks>   specify upgrade delay block count (default: "0")
  -h, --help                 display help for command
```

### `aurora init`

```console
$ aurora init -h
Usage: aurora initialize|init [options]

Options:
  --chain <id>               specify EVM chain ID (default: "0")
  --owner <account>          specify owner account ID (default: "")
  --bridge-prover <account>  specify bridge prover account ID (default: "")
  --upgrade-delay <blocks>   specify upgrade delay block count (default: "0")
  -h, --help                 display help for command
```
