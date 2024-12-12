import { assertCredential } from "@/assertions/credential";
import { Routes } from "@/lib/routes";
import type {
	APICredentialInfo,
	APICredentialType,
} from "@quikcess/bet-api-types/v1";
import type { Betting } from "..";
import { assertString } from "@/assertions/literal";

export class CredentialModule {
	constructor(private readonly client: Betting) {}

  /**
	 * Get informations of credential
	 */
  async get(guildId?: string): Promise<APICredentialInfo> {
    if (guildId) assertString(guildId);
    const query = guildId ? { guildId } : {}
		const { response } = await this.client.api.request(Routes.credentials.get(), { query });
    return response
  }

	/**
	 * Generate the credential
	 */
	async generate(
		guildId: string,
		userId: string,
		type: APICredentialType,
	): Promise<APICredentialInfo> {
		assertCredential({ guildId, userId, type });

		const { response } = await this.client.api.request(Routes.credentials.generate(), {
			method: "POST",
			body: {
				guildId,
				userId,
				type,
			},
		});

		return response;
	}
}
