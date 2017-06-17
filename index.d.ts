declare namespace injectEnv {
    export function getEnvVar(name: string, defaultValue: string): string;
}

declare function injectEnv (s: string): string;
export = injectEnv;
