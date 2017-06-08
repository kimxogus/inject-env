declare namespace stringEnvParser {
    export function getEnvVar(name: string, defaultValue: string): string;
}

declare function stringEnvParser (s: string): string;
export = stringEnvParser;
