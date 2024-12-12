import { APICredentialType } from "@quikcess/bet-api-types/v1";
import * as z from "zod";
import { assertAPIObject } from "./common";

const CredentialSchema = z.object({
	guildId: z.string(),
	userId: z.string(),
	type: z.nativeEnum(APICredentialType),
});

export function assertCredential(
	value: unknown,
): asserts value is z.infer<typeof CredentialSchema> {
	assertAPIObject({
		schema: CredentialSchema,
		value,
		code: "CREDENTIAL",
		route: "/credential",
	});
}
