import type { APICredential, CredentialType } from "@quikcess/bet-api-types/v1";
import { assertCredential } from "#quikcess/assertions/credential";
import { toSnakeCase } from "#quikcess/utils/cases/index";

/**
 * Represents an API credential
 */
export class Credential {
	/** The API key */
	public readonly apiKey: string;

	/** The guild ID associated with the credential */
	public readonly guildId: string;

	/** The user ID associated with the credential */
	public readonly userId: string;

	/** The type of the credential */
	public readonly type: CredentialType;

	/** The date the credential was created */
	public readonly createdAt: Date;

	/** The date the credential was last updated */
	public readonly updatedAt: Date;

	/**
	 * Represents an API credential
	 *
	 * @constructor
	 * @param data - The data for this credential
	 */
	constructor(data: APICredential) {
		assertCredential(data, "structures/credential");

		const { api_key, guild_id, user_id, type, created_at, updated_at } = data;

		this.apiKey = api_key;
		this.guildId = guild_id;
		this.userId = user_id;
		this.type = type;
		this.createdAt = new Date(created_at);
		this.updatedAt = new Date(updated_at);
	}

	public static from(data: APICredential): Credential {
		return new Credential(data);
	}

	public toJSON(): APICredential {
		const data: APICredential = toSnakeCase<Credential, APICredential>(this);
		return data;
	}
}
