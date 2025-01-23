import { assertScam } from "@/assertions/scam";
import { toSnakeCase } from "@/utils/cases/index";
import type { APIScam, ScamStatus, ScamType } from "@quikcess/bet-api-types/v1";

/**
 * Represents a scam entry.
 */
export class Scam {
	/** The guild (server) ID associated with the scam entry. */
	guildId: string;
	/** The name of the target (e.g., user, channel, or entity) flagged in the scam entry. */
	targetName: string;
	/** The type of scam (e.g., refund fraud, stealing, cheating). */
	type: ScamType;
	/** The current status of the scam entry. */
	status: ScamStatus;
	/** Detailed description of the scam report. */
	details: string;
	/** The ID of the user who reported this scam entry. */
	reportedBy: string;
	/** Evidence associated with the scam entry. */
	evidences: string[];
	/** The timestamp when the scam entry was created. */
	createdAt: Date;
	/** The timestamp when the scam entry was last updated. */
	updatedAt: Date;
	/** The timestamp when the scam entry was validated (optional). */
	validatedAt: Date | null;
	/** The ID of the user who validated this scam entry (optional). */
	validatedBy: string | null;

	/**
	 * Constructs a new instance of a scam entry.
	 *
	 * @constructor
	 * @param data - The data used to initialize this scam entry.
	 */
	constructor(data: APIScam) {
		assertScam(data, "structures/scam");

		this.guildId = data.guild_id;
		this.targetName = data.target_name;
		this.type = data.type;
		this.status = data.status;
		this.details = data.details;
		this.reportedBy = data.reported_by;
		this.evidences = data.evidences;
		this.createdAt = new Date(data.created_at);
		this.updatedAt = new Date(data.updated_at);
		this.validatedAt = data.validated_at ? new Date(data.validated_at) : null;
		this.validatedBy = data.validated_by;
	}

	/**
	 * Creates a new Scam instance from a given APIScam object.
	 *
	 * @param data - The APIScam object to convert.
	 * @returns A new instance of the Scam class.
	 */
	public static from(data: APIScam): Scam {
		return new Scam(data);
	}

	/**
	 * Converts the Scam instance back into an APIScam object.
	 *
	 * @returns The APIScam object representation of this instance.
	 */
	public toJSON(): APIScam {
		const data: APIScam = toSnakeCase<Scam, APIScam>(this);
		return data;
	}
}
