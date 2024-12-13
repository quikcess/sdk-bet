import { assertGenerateCredentialKey } from "@/assertions/credential";
import { assertString } from "@/assertions/literal";
import { Routes } from "@/lib/routes";
import type {
	APICredentialInfo,
	APICredentialType,
} from "@quikcess/bet-api-types/v1";
import type { Betting } from "..";

export class CredentialModule {
	constructor(private readonly client: Betting) {}

	/**
	 * Get informations of credential
	 */
	async get(guildId?: string): Promise<APICredentialInfo> {
		if (guildId) assertString(guildId);
		const query = guildId ? { guild_id: guildId } : {};
		const { response } = await this.client.api.request(
			Routes.credentials.get(),
			{ query },
		);
		return response;
	}

	/**
	 * Generate the credential
	 */
	async generate(
		guildId: string,
		userId: string,
		type: APICredentialType,
	): Promise<APICredentialInfo> {
		assertGenerateCredentialKey(
			{ guild_id: guildId, user_id: userId, type },
			"/credentials/generate-api-key",
		);

		const { response } = await this.client.api.request(
			Routes.credentials.generate(),
			{
				method: "POST",
				body: {
					guild_id: guildId,
					user_id: userId,
					type,
				},
			},
		);

		return response;
	}
}
