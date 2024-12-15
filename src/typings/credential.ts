import type { APICredentialType, ISODateString } from "@quikcess/bet-api-types/v1";

export interface Credential {
	apiKey: string;
	guildId: string;
	userId: string;
	type: APICredentialType;
	createdAt: ISODateString;
	updatedAt: ISODateString;
}
