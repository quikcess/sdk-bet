import { APICredentialType } from "@quikcess/bet-api-types/v1";
import * as z from "zod";
import { assertAPIObject } from "./common";
import { parseDate } from "@/utils/date";

const CredentialSchema = z.object({
	apiKey: z.string(),
	guildId: z.string(),
	userId: z.string(),
	type: z.nativeEnum(APICredentialType),
	createdAt: z.preprocess(
		parseDate,
		z.string().default(() => new Date().toISOString()),
	),
	updatedAt: z.preprocess(
		parseDate,
		z.string().default(() => new Date().toISOString()),
	),
});

export const GenerateApiKeySchema = z
	.object({
		guildId: z
			.string()
			.regex(/^\d+$/, { message: "GUILD_ID_MUST_BE_NUMERIC_STRING" }),
		userId: z.string({ message: "INVALID_USER_ID" }),
		type: z.nativeEnum(APICredentialType),
	})
	.superRefine((data, ctx) => {
		if (data.type === APICredentialType.Unlimited && data.guildId !== "0") {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ["guildId"],
				message: "FOR_TYPE_UNLIMITED_GUILD_ID_MUST_BE_0",
			});
		} else if (
			data.type !== APICredentialType.Unlimited &&
			data.guildId === "0"
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
