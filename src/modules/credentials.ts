import { assertGenerateCredentialKey } from "@/assertions/credential.js";
import { assertString } from "@/assertions/literal.js";
import { Routes } from "@/lib/routes.js";
import { toSnakeCase } from "@/utils/cases/index.js";
import type { CredentialType } from "@quikcess/bet-api-types/v1";
import { type Betting, Credential } from "../index.js";

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
		type: CredentialType,
	): Promise<Credential> {
		const payload = toSnakeCase({ guildId, userId, type });

		assertGenerateCredentialKey(payload, "/credentials/generate-api-key");

		const { response } = await this.client.api.request(
			Routes.credentials.generate(),
			{
				method: "POST",
				body: payload,
			},
		);

		return new Credential(response);
	}
}
