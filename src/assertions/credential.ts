import { CredentialType } from "@quikcess/bet-api-types/v1";
import * as z from "zod";
import { ISODateStringSchema } from "#quikcess/utils/date/index";
import { NumericStringSchema, assertAPIObject } from "./common";

const CredentialSchema = z.object({
	api_key: z.string(),
	guild_id: NumericStringSchema("guild_id"),
	user_id: NumericStringSchema("user_id"),
	type: z.nativeEnum(CredentialType),
	created_at: ISODateStringSchema.default(() => new Date().toISOString()),
	updated_at: ISODateStringSchema.default(() => new Date().toISOString()),
});

export const GenerateApiKeySchema = z
	.object({
		guild_id: NumericStringSchema("guild_id"),
		user_id: NumericStringSchema("user_id"),
		type: z.nativeEnum(CredentialType),
	})
	.superRefine((data, ctx) => {
		if (data.type === CredentialType.Unlimited && data.guild_id !== "0") {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ["guildId"],
				message: "FOR_TYPE_UNLIMITED_GUILD_ID_MUST_BE_0",
			});
		} else if (
			data.type !== CredentialType.Unlimited &&
			data.guild_id === "0"
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ["guildId"],
				message: "FOR_UNLIMITED_TYPE_ONLY_GUILD_ID_MUST_BE_0",
			});
		}
	});

export function assertCredential(
	value: unknown,
	route: string,
): asserts value is z.infer<typeof CredentialSchema> {
	assertAPIObject({
		schema: CredentialSchema,
		value,
		code: "CREDENTIAL",
		route,
	});
}

export function assertGenerateCredentialKey(
	value: unknown,
	route: string,
): asserts value is z.infer<typeof CredentialSchema> {
	assertAPIObject({
		schema: GenerateApiKeySchema,
		value,
		code: "GENERATE_CREDENTIAL_KEY",
		route,
	});
}
