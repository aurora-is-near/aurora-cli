⚠ WARNING: This repository is no longer maintained. Please visit [Aurora CLI](https://github.com/aurora-is-near/aurora-cli-rs).

# Aurora Engine Command-Line Interface (CLI)

[![Project license](https://img.shields.io/badge/License-Public%20Domain-blue.svg)](https://creativecommons.org/publicdomain/zero/1.0/)
[![Discord](https://img.shields.io/discord/490367152054992913?label=Discord)](https://discord.gg/jNjHYUF8vw)
[![Lints](https://github.com/aurora-is-near/aurora-cli/actions/workflows/lints.yml/badge.svg)](https://github.com/aurora-is-near/aurora-cli/actions/workflows/lints.yml)

Latest version:

[![npm version](https://badge.fury.io/js/@auroraisnear%2Fcli.svg)](https://badge.fury.io/js/@auroraisnear%2Fcli)

## Prerequisites

- Node.js (v14+)

## Installation

```shell
npm install -g @auroraisnear/cli
```

## Usage

See https://github.com/aurora-is-near/aurora-engine#usage for usage examples.

### Key Management

The CLI will load the following local keys by default, if found:

- `$HOME/.near-credentials/*/*.json`: credentials stored by the NEAR CLI

- `$HOME/.near/validator_key.json`: the local `nearcore` validator key
  (for the `test.near` master account)

## Reference

- [`aurora help`](#aurora-help)
- [`aurora install`](#aurora-install)
- [`aurora init`](#aurora-init)
- [`aurora get-version`](#aurora-get-version)
- [`aurora get-owner`](#aurora-get-owner)
- [`aurora get-bridge-prover`](#aurora-get-bridge-prover)
- [`aurora get-chain-id`](#aurora-get-chain-id)
- [`aurora get-upgrade-index`](#aurora-get-upgrade-index)
- [`aurora get-aurora-erc20`](#aurora-get-aurora-erc20)
- [`aurora stage-upgrade`](#aurora-stage-upgrade)
- [`aurora deploy-upgrade`](#aurora-deploy-upgrade)
- [`aurora deploy-code`](#aurora-deploy-code)
- [`aurora call`](#aurora-call)
- [`aurora meta-call`](#aurora-meta-call)
- [`aurora view`](#aurora-view)
- [`aurora get-code`](#aurora-get-code)
- [`aurora get-balance`](#aurora-get-balance)
- [`aurora get-nonce`](#aurora-get-nonce)
- [`aurora get-storage-at`](#aurora-get-storage-at)
- [`aurora begin-chain`](#aurora-begin-chain)
- [`aurora begin-block`](#aurora-begin-block)
- [`aurora dump-storage`](#aurora-dump-storage)
- [`aurora encode-address`](#aurora-encode-address)
- [`aurora encode-hash`](#aurora-encode-hash)

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
  get-version
  get-owner
  get-bridge-prover
  get-chain-id|get-chain
  get-upgrade-index
  stage-upgrade
  deploy-upgrade
  deploy-code|deploy <bytecode>
  call <address> <input>
  meta-call
  view [options] <address> <input>
  get-code <address>
  get-balance <address>
  get-nonce <address>
  get-storage-at|get-storage <address> <key>
  begin-chain <id>
  begin-block <hash>
  dump-storage
  encode-address <account>
  encode-hash <base58>
  help [command]                              display help for command
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

### `aurora get-version`

```console
$ aurora get-version -h
Usage: aurora get-version|get_version [options]

Options:
  -h, --help  display help for command
```

### `aurora get-owner`

```console
$ aurora get-owner -h
Usage: aurora get-owner|get_owner [options]

Options:
  -h, --help  display help for command
```

### `aurora get-bridge-prover`

```console
$ aurora get-bridge-prover -h
Usage: aurora get-bridge-prover|get_bridge_prover [options]

Options:
  -h, --help  display help for command
```

### `aurora get-chain-id`

```console
$ aurora get-chain-id -h
Usage: aurora get-chain-id|get_chain_id [options]

Options:
  -h, --help  display help for command
```

### `aurora get-upgrade-index`

```console
$ aurora get-upgrade-index -h
Usage: aurora get-upgrade-index|get_upgrade_index [options]

Options:
  -h, --help  display help for command
```

### `aurora stage-upgrade`

```console
$ aurora stage-upgrade -h
Usage: aurora stage-upgrade|stage_upgrade [options]

Options:
  -h, --help  display help for command
```

### `aurora get-aurora-erc20`

```console
$ aurora get-aurora-erc20 -h
Usage: aurora get-aurora-erc20 [options] <tokenAddress>

Options:
  -h, --help  display help for command
```

### `aurora deploy-upgrade`

```console
$ aurora deploy-upgrade -h
Usage: aurora deploy-upgrade|deploy_upgrade [options]

Options:
  -h, --help  display help for command
```

### `aurora deploy-code`

```console
$ aurora deploy-code -h
Usage: aurora deploy-code|deploy [options] <bytecode>

Options:
  -h, --help  display help for command
```

### `aurora call`

```console
$ aurora call -h
Usage: aurora call [options] <address> <input>

Options:
  -h, --help  display help for command
```

### `aurora meta-call`

```console
$ aurora meta-call -h
Usage: aurora meta-call|meta_call [options]

Options:
  -h, --help  display help for command
```

### `aurora view`

```console
$ aurora view -h
Usage: aurora view [options] <address> <input>

Options:
  --sender <address>  specify the sender address (default:
                      "0x0000000000000000000000000000000000000000")
  --amount <value>    attach an ETH amount (default: "0")
  -h, --help          display help for command
```

### `aurora get-code`

```console
$ aurora get-code -h
Usage: aurora get-code|get_code [options] <address>

Options:
  -h, --help  display help for command
```

### `aurora get-balance`

```console
$ aurora get-balance -h
Usage: aurora get-balance|get_balance [options] <address>

Options:
  -h, --help  display help for command
```

### `aurora get-nonce`

```console
$ aurora get-nonce -h
Usage: aurora get-nonce|get_nonce [options] <address>

Options:
  -h, --help  display help for command
```

### `aurora get-storage-at`

```console
$ aurora get-storage-at -h
Usage: aurora get-storage-at|get_storage_at [options] <address> <key>

Options:
  -h, --help  display help for command
```

### `aurora begin-chain`

```console
$ aurora begin-chain -h
Usage: aurora begin-chain|begin_chain [options] <id>

Options:
  -h, --help  display help for command
```

### `aurora begin-block`

```console
$ aurora begin-block -h
Usage: aurora begin-block|begin_block [options] <hash>

Options:
  -h, --help  display help for command
```

### `aurora dump-storage`

```console
$ aurora dump-storage -h
Usage: aurora dump-storage|dump_storage [options]

Options:
  -h, --help  display help for command
```

### `aurora encode-address`

```console
$ aurora encode-address -h
Usage: aurora encode-address [options] <account>

Options:
  -h, --help  display help for command
```

### `aurora encode-hash`

```console
$ aurora encode-hash -h
Usage: aurora encode-hash [options] <base58>

Options:
  -h, --help  display help for command
```

## Development

### Local development

```sh
alias aurora='node lib/aurora.js'
export NEAR_URL=http://localhost:3030
```

### Release new version

1. Bump version in `package.json`
2. Create release in [Releases](https://github.com/aurora-is-near/aurora-cli/releases)
