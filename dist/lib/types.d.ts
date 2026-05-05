type CamelCase<S extends string> = S extends `${infer Head}_${infer Tail}` ? `${Head}${Capitalize<CamelCase<Tail>>}` : S;
export type CamelizeKeys<T> = {
    [K in keyof T as CamelCase<K & string>]: T[K];
};
export {};
//# sourceMappingURL=types.d.ts.map