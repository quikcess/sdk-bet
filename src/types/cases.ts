type SnakeToCamelCase<S extends string> =
	S extends `${infer T}_${infer U}` ? `${T}${Capitalize<SnakeToCamelCase<U>>}` : S;

export type CamelCase<T> = {
	[K in keyof T as SnakeToCamelCase<string & K>]: T[K];
};