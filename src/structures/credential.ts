import { assertCredential } from "@/assertions/credential";
import type {
  APICredentialInfo,
  APICredentialType,
} from "@quikcess/bet-api-types/v1";

/**
 * Represents an api status
 */
export class Credential {
  /** API response time */
  apiKey: string;
  /** API response time */
  guildId: string;
  /** API response time */
  userId: string;
  /** API response time */
  type: APICredentialType;
  /** API response time */
  createdAt: Date;
  /** API response time */
  updatedAt: Date;

  /**
   * Represents an api status
   *
   * @constructor
   * @param data - The data from this status
   */
  constructor(data: APICredentialInfo) {
    assertCredential(data, "structures/credential");

    const { api_key, guild_id, user_id, type,created_at,updated_at } = data;

    this.apiKey = api_key;
    this.guildId = guild_id;
    this.userId = user_id;
    this.type = type;
    this.createdAt = new Date(created_at)
    this.updatedAt = new Date(updated_at)
  }
}
