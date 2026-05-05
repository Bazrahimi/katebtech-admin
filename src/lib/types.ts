type CamelCase<S extends string> = S extends `${infer Head}_${infer Tail}`
  ? `${Head}${Capitalize<CamelCase<Tail>>}`
  : S;

// 2) Map object keys using CamelCase
export type CamelizeKeys<T> = {
  [K in keyof T as CamelCase<K & string>]: T[K];
};