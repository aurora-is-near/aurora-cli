#!/usr/bin/env node
import { ConnectEnv } from '@aurora-is-near/engine';
declare global {
    namespace NodeJS {
        interface ProcessEnv extends ConnectEnv {
        }
    }
}
