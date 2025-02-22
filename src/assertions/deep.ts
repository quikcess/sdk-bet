import z from "zod";

type ZodDeepPartial<T extends z.ZodTypeAny> =
	T extends z.ZodObject<z.ZodRawShape>
		? z.ZodObject<
				{
					[k in keyof T["shape"]]: z.ZodOptional<ZodDeepPartial<T["shape"][k]>>;
				},
				T["_def"]["unknownKeys"],
				T["_def"]["catchall"]
			>
		: T extends z.ZodArray<infer Type, infer Card>
			? z.ZodArray<ZodDeepPartial<Type>, Card>
			: T extends z.ZodOptional<infer Type>
				? z.ZodOptional<ZodDeepPartial<Type>>
				: T extends z.ZodNullable<infer Type>
					? z.ZodNullable<ZodDeepPartial<Type>>
					: T extends z.ZodTuple<infer Items>
						? {
								[k in keyof Items]: Items[k] extends z.ZodTypeAny
									? ZodDeepPartial<Items[k]>
									: never;
							} extends infer PI
							? PI extends z.ZodTupleItems
								? z.ZodTuple<PI>
								: never
							: never
						: T;

export function deepPartialify<T extends z.ZodTypeAny>(
	schema: T,
): ZodDeepPartial<T> {
	return _deepPartialify(schema);
}

function _deepPartialify(schema: z.ZodTypeAny): any {
	if (schema instanceof z.ZodObject) {
		const newShape: any = {};

		for (const key in schema.shape) {
			const fieldSchema = schema.shape[key];
			newShape[key] = z.ZodOptional.create(_deepPartialify(fieldSchema));
		}
		return new z.ZodObject({
			...schema._def,
			shape: () => newShape,
		}) as any;
	}
	if (schema instanceof z.ZodArray) {
		return new z.ZodArray({
			...schema._def,
			type: _deepPartialify(schema.element),
		});
	}
	if (schema instanceof z.ZodOptional) {
		return z.ZodOptional.create(_deepPartialify(schema.unwrap()));
	}
	if (schema instanceof z.ZodNullable) {
		return z.ZodNullable.create(_deepPartialify(schema.unwrap()));
	}
	if (schema instanceof z.ZodTuple) {
		return z.ZodTuple.create(
			schema.items.map((item: any) => _deepPartialify(item)),
		);
	}
	return schema;
}
