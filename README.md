# Aurora Engine Command-Line Interface (CLI)

[![Project license](https://img.shields.io/badge/License-Public%20Domain-blue.svg)](https://creativecommons.org/publicdomain/zero/1.0/)
[![Discord](https://img.shields.io/discord/490367152054992913?label=Discord)](https://discord.gg/jNjHYUF8vw)
[![Lints](https://github.com/aurora-is-near/aurora-cli/actions/workflows/lints.yml/badge.svg)](https://github.com/aurora-is-near/aurora-cli/actions/workflows/lints.yml)

## Prerequisites

- Node.js (v14+)

## Installation

```shell
npm install -g aurora-is-near/aurora-cli
```

## Usage

See https://github.com/aurora-is-near/aurora-engine#usage

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
  get-version
  get-owner
  get-bridge-provider
  get-chain-id
  get-upgrade-index
  stage-upgrade
  deploy-upgrade
  deploy-code|deploy <bytecode>
  call <address> <input>
  raw-call <input>
  meta-call
  view [options] <address> <input>
  get-code <address>
  get-balance <address>
  get-nonce <address>
  get-storage-at <address> <key>
  begin-chain <id>
  begin-block <hash>
  dump-storage
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

### `aurora get-bridge-provider`

```console
$ aurora get-bridge-provider -h
Usage: aurora get-bridge-provider|get_bridge_provider [options]

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

### `aurora raw-call`

```console
$ aurora raw-call -h
Usage: aurora raw-call|raw_call [options] <input>

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

## Development

### Local development

```sh
alias aurora='node aurora.js'
export NEAR_URL=http://localhost:3030
```
