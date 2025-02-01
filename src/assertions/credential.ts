import { CredentialType } from "@quikcess/bet-api-types/v1";
import * as z from "zod";
import { ISODateStringSchema } from "#quikcess/utils/date/index";
import { createAssertion } from "./common";

const CredentialSchema = z.object({
	api_key: z.string(),
	guild_id: z.string().regex(/^\d+$/, "GUILD_ID_MUST_BE_NUMERICAL_STRING"),
	user_id: z.string().regex(/^\d+$/, "USER_ID_MUST_BE_NUMERICAL_STRING"),
	type: z.nativeEnum(CredentialType),
	created_at: ISODateStringSchema,
	updated_at: ISODateStringSchema,
});

export const GenerateApiKeySchema = z
	.object({
		guild_id: z.string().regex(/^\d+$/, "GUILD_ID_MUST_BE_NUMERICAL_STRING"),
		user_id: z.string().regex(/^\d+$/, "USER_ID_MUST_BE_NUMERICAL_STRING"),
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

export const assertCredential: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof CredentialSchema> = createAssertion(
	CredentialSchema,
	"CREDENTIAL",
	"/credential/?",
);

export const assertGenerateCredentialKey: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof CredentialSchema> = createAssertion(
	CredentialSchema,
	"GENERATE_CREDENTIAL_KEY",
	"/credential/generate-credential-key/?",
);
