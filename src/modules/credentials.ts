import { assertCredential } from "@/assertions/credential";
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
  async get() {return}

	/**
	 * Create the credential
	 */
	async create(
		guildId: string,
		email: string,
		type: APICredentialType,
	): Promise<APICredentialInfo> {
		assertCredential({ guildId, email, type });

		const { response } = await this.client.api.request(Routes.credential(), {
			method: "POST",
			body: {
				guildId,
				email,
				type,
			},
		});

		return response;
	}
}
