import WebSocket from "ws";
import { assertString } from "./assertions/literal";
import { Routes } from "./lib/routes";
import { BetManager } from "./managers/bet/global";
import { BlacklistManager } from "./managers/blacklist/global";
import { CredentialManager } from "./managers/credential";
import { GuildManager } from "./managers/guild";
import { MediatorManager } from "./managers/mediator/global";
import { ScamManager } from "./managers/scam/global";
import { UserManager } from "./managers/user/global";
import { APIService } from "./services/index";
import { Status } from "./structures/index";
import { type APIEvents, TypedEventEmitter } from "./types/index";

export * from "./structures/index";
export * from "./types/index";

/**
 * Betting - Manages communication with the API, including WebSocket for real-time events.
 */
export class Betting extends TypedEventEmitter<APIEvents> {
	public static apiInfo = {
		baseUrl: "https://api.quikcess.com",
		version: "v1",
	};

	/** WS service */
	private ws: WebSocket;
	/** API service */
	public readonly api: APIService;
	/** API service */
	public readonly credentials: CredentialManager;
	/** Bets manager */
	public readonly bets: BetManager;
	/** Bets manager */
	public readonly users: UserManager;
	/** Bets manager */
	public readonly mediators: MediatorManager;
	/** Blacklist manager */
	public readonly blacklist: BlacklistManager;
	/** Scams manager */
	public readonly scams: ScamManager;
	/** Guilds manager */
	public readonly guilds: GuildManager;

	constructor(apiKey: string) {
		super();

		// Validate API key
		assertString(apiKey, "API_KEY");

		// Initialize WebSocket
		this.websocket(apiKey);

		// Initialize API service
		this.api = new APIService(apiKey);

		// Credentials manager
		this.credentials = new CredentialManager(this);

		// Bets manager
		this.bets = new BetManager(this);

		// Users manager
		this.users = new UserManager(this);

		// Mediators manager
		this.mediators = new MediatorManager(this);

		// Blacklist manager
		this.blacklist = new BlacklistManager(this);

		// Scams manager
		this.scams = new ScamManager(this);

		// Initializing the Guild Manager to start managing guilds.
		this.guilds = new GuildManager(this);
	}

	private async websocket(apiKey: string) {
		this.ws = new WebSocket(Betting.apiInfo.baseUrl, {
			headers: {
				authorization: `Bearer ${apiKey}`,
			},
		});

		this.ws.on("message", (message: WebSocket.Data) => {
			try {
				const { event, data } = JSON.parse(message.toString());

				if (Array.isArray(data)) {
					this.emit(event, ...data);
				} else {
					this.emit(event, data);
				}

				// Sync to WS Cache
			} catch (error) {
				console.error("Error processing websocket message:", error);
			}
		});
	}

	async status(): Promise<Status> {
		const { response } = await this.api.request(Routes.status());
		return new Status(response);
	}
}
