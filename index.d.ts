declare namespace injectEnv {
    export function getEnvVar(name: string, defaultValue: ?string, env: ?object): string;
}

declare function injectEnv (s: string, env: ?object): string;
declare function injectEnv <T>(a: Array<T>, env: ?object): array<T>;
declare function injectEnv (o: object, env: ?object): object;
export = injectEnv;
