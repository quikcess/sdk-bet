import type { CredentialType } from "@quikcess/bet-api-types/v1";
import { assertGenerateCredentialKey } from "#quikcess/assertions/credential";
import { assertString } from "#quikcess/assertions/literal";
import { Routes } from "#quikcess/lib/routes";
import { toSnakeCase } from "#quikcess/utils/cases/index";
import { type Betting, Credential } from "../../index";

export class CredentialManager {
	constructor(private readonly client: Betting) {}

	/**
	 * Fetch informations of credential
	 */
	async fetch(guildId?: string): Promise<Credential> {
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
