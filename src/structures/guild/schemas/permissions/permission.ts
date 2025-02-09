import type { APIGuildPermission } from "@quikcess/bet-api-types/v1";
import { toSnakeCase } from "#quikcess/utils/cases";
import type { Guild } from "../../guild";

/**
 * Represents a guild's permission.
 */
export class GuildPermission {
	/** Unique identifier for the permission. */
	public id: number;

	/** List of role IDs associated with this permission. */
	public roleIds: string[];

	/** Reference to the parent Guild object. */
	private readonly guild: Guild;

	constructor(guild: Guild, data: APIGuildPermission) {
		this.guild = guild;
		this.id = data.id;
		this.roleIds = data.role_ids;
	}

	/**
	 * Add roles to the permission
	 * @param roleIds Array of role IDs to add
	 * @returns Promise<boolean> indicating if the operation was successful
	 */
	public async addRoles(roleIds: string[]): Promise<boolean> {
		if (!Array.isArray(roleIds)) return false;

		const uniqueRoles = new Set([...this.roleIds, ...roleIds]);
		this.roleIds = Array.from(uniqueRoles);

		try {
			const currentPermissions = this.guild.permissions.permissions;
			const updatedPermissions = currentPermissions.map((perm) =>
				perm.id === this.id ? this.toJSON() : perm,
			);

			await this.guild.update({ permissions: updatedPermissions });
			return true;
		} catch (error) {
			return false;
		}
	}

	/**
	 * Remove roles from the permission
	 * @param roleIds Array of role IDs to remove
	 * @returns Promise<boolean> indicating if the operation was successful
	 */
	public async removeRoles(roleIds: string[]): Promise<boolean> {
		if (!Array.isArray(roleIds)) return false;

		this.roleIds = this.roleIds.filter((id) => !roleIds.includes(id));

		try {
			const currentPermissions = this.guild.permissions.permissions;
			const updatedPermissions = currentPermissions.map((perm) =>
				perm.id === this.id ? this.toJSON() : perm,
			);

			await this.guild.update({ permissions: updatedPermissions });
			return true;
		} catch (error) {
			return false;
		}
	}

	/**
	 * Convert the permission object to JSON format
	 * @returns APIGuildPermission object in snake_case format
	 */
	public toJSON() {
		const data: APIGuildPermission = toSnakeCase<
			GuildPermission,
			APIGuildPermission
		>(this);
		return data;
	}
}
