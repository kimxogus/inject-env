declare namespace injectEnv {
    export function getEnvVar(name: string, defaultValue: string): string;
}

declare function injectEnv (s: string): string;
declare function injectEnv <T>(o: Array<T>): array<T>;
declare function injectEnv (o: object): object;
export = injectEnv;
