import { Routes } from "@/lib/routes";
import type { Betting } from "..";
import type { APICredentialInfo, APICredentialType } from "@quikcess/bet-api-types/v1";
import { assertCredential } from "@/assertions/credential";

export class CredentialModule {
  constructor(private readonly client: Betting) {}

  /**
   * Create the credential
   */
  async create(guildId: string, email: string, type: APICredentialType): Promise<APICredentialInfo> {
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
