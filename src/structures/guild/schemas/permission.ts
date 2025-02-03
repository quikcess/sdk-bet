import type { APIGuildPermission } from "@quikcess/bet-api-types/v1";
import { toSnakeCase } from "#quikcess/utils/cases";

/**
 * Represents a guild's permissions.
 */
export class GuildPermission {
	/** Unique identifier for the permission. */
	public id: number;

	/** List of role IDs associated with this permission. */
	public roleIds: string[];

	constructor(data: APIGuildPermission) {
		this.id = data.id;
		this.roleIds = data.role_ids;
	}

	public toJSON() {
		const data: APIGuildPermission = toSnakeCase<
			GuildPermission,
			APIGuildPermission
		>(this);
		return data;
	}
}
