import { assertGenerateCredentialKey } from "@/assertions/credential";
import { assertString } from "@/assertions/literal";
import { Routes } from "@/lib/routes";
import type {
	APICredentialType,
} from "@quikcess/bet-api-types/v1";
import { Credential, type Betting } from "..";

export class CredentialModule {
	constructor(private readonly client: Betting) {}

	/**
	 * Get informations of credential
	 */
	async get(guildId?: string): Promise<Credential> {
		if (guildId) assertString(guildId);

		const query = guildId ? { guild_id: guildId } : {};
		const { response } = await this.client.api.request(
			Routes.credentials.get(),
			{ query },
		);

		return new Credential(response);
	}

	/**
	 * Generate the credential
	 */
	async generate(
		guildId: string,
		userId: string,
		type: APICredentialType,
	): Promise<Credential> {
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

		return new Credential(response);
	}
}
