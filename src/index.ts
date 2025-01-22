import WebSocket from "ws";
import { assertString } from "./assertions/literal";
import { Routes } from "./lib/routes";
import { BetModule } from "./modules/bets";
import { BlacklistModule } from "./modules/blacklist";
import { CredentialModule } from "./modules/credentials";
import { ScamModule } from "./modules/scam";
import { GlobalCacheService } from "./services/cache/global";
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
	/** Credentials module */
	public readonly credentials = new CredentialModule(this);
	/** Bets module */
	public readonly bets = new BetModule(this);
	/** Scam module */
	public readonly scam = new ScamModule(this);
	/** Blacklist module */
	public readonly blacklist = new BlacklistModule(this);
	/** Global cache service */
	public readonly cache = new GlobalCacheService();

	constructor(apiKey: string) {
		super();

		// Validate API key
		assertString(apiKey, "API_KEY");

		// Initialize WebSocket
		this.websocket(apiKey);

		// Initialize API service
		this.api = new APIService(apiKey);
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
