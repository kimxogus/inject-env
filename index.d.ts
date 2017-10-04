declare namespace injectEnv {
}

interface option {
  defaultValue: ?(string | number),
  env: ?object,
  verbose: ?boolean,
}

declare function injectEnv (s: string, option: ?option): string;
declare function injectEnv <T>(a: Array<T>, option: ?option): array<T>;
declare function injectEnv (o: object, option: ?option): object;
export = injectEnv;
