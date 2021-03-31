#!/usr/bin/env node
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEAR_MASTER_ACCOUNT?: string;
            NEAR_EVM_ACCOUNT?: string;
        }
    }
}
export {};
