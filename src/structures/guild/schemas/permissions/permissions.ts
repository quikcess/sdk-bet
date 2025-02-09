import type { APIGuildPermission } from "@quikcess/bet-api-types/v1";
import type { Guild } from "../../guild";
import { GuildPermission } from "./permission";

/**
 * Represents a guild's permissions.
 */
export class GuildPermissions {
	/** List of permissions */
	public permissions: GuildPermission[];

	/** Reference to the parent Guild object. */
	private readonly guild: Guild;

	constructor(guild: Guild, data: APIGuildPermission[]) {
		this.guild = guild;
		this.permissions = data.map(
			(permission) => new GuildPermission(guild, permission),
		);
	}

	/**
	 * Add a new permission or update existing one
	 * @param permissionId The permission ID
	 * @param roleIds Array of role IDs
	 * @returns Promise<boolean> indicating if the operation was successful
	 */
	public async addPermission(
		permissionIds: number[],
		roleIds: string[],
	): Promise<boolean> {
		if (!Array.isArray(roleIds) || !Array.isArray(permissionIds)) return false;

		for (const permissionId of permissionIds) {
			const existingPermission = this.permissions.find(
				(p) => p.id === permissionId,
			);

			if (existingPermission) {
				const uniqueRoles = new Set([
					...existingPermission.roleIds,
					...roleIds,
				]);
				existingPermission.roleIds = Array.from(uniqueRoles);
			} else {
				this.permissions.push(
					new GuildPermission(this.guild, {
						id: permissionId,
						role_ids: roleIds,
					}),
				);
			}
		}

		try {
			await this.guild.update({ permissions: this.toJSON() });
			return true;
		} catch (error) {
			return false;
		}
	}

	/**
	 * Remove roles from a permission
	 * @param permissionId The permission ID
	 * @param roleIds Array of role IDs to remove
	 * @returns Promise<boolean> indicating if the operation was successful
	 */
	public async removePermission(
		permissionId: number | number[],
		roleIds: string[],
	): Promise<boolean> {
		const permissionIds = Array.isArray(permissionId)
			? permissionId
			: [permissionId];

		for (const id of permissionIds) {
			const existingPermissionIndex = this.permissions.findIndex(
				(p) => p.id === id,
			);

			if (existingPermissionIndex === -1) continue;

			// Remove specific roles from the permission
			this.permissions[existingPermissionIndex].roleIds = this.permissions[
				existingPermissionIndex
			].roleIds.filter((roleId) => !roleIds.includes(roleId));

			// If no roles left, remove the entire permission
			if (this.permissions[existingPermissionIndex].roleIds.length === 0) {
				this.permissions.splice(existingPermissionIndex, 1);
			}
		}

		try {
			await this.guild.update({ permissions: this.toJSON() });
			return true;
		} catch (error) {
			return false;
		}
	}

	/**
	 * Find all role IDs associated with specified permission IDs
	 * @param permissionIds Single permission ID or array of permission IDs
	 * @returns Array of unique role IDs associated with the permissions
	 */
	public findRoles(permissionId: number | number[]): string[] {
		const permissionIds = Array.isArray(permissionId)
			? permissionId
			: [permissionId];

		const allRoles = new Set<string>();

		for (const id of permissionIds) {
			const permission = this.permissions.find((p) => p.id === id);
			if (permission) {
				for (const roleId of permission.roleIds) {
					allRoles.add(roleId);
				}
			}
		}

		return Array.from(allRoles);
	}

	/**
	 * Convert the permissions array to JSON format
	 * @returns APIGuildPermission array in snake_case format
	 */
	public toJSON(): APIGuildPermission[] {
		return this.permissions.map((permission) => ({
			id: permission.id,
			role_ids: permission.roleIds,
		}));
	}
}
