import WebSocket from "ws";
import { assertString } from "./assertions/literal";
import { Routes } from "./lib/routes";
import { BetManager } from "./managers/bet";
import { GuildManager } from "./managers/guild";
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

	public readonly bets: BetManager;

	public readonly guilds: GuildManager;

	constructor(apiKey: string) {
		super();

		// Validate API key
		assertString(apiKey, "API_KEY");

		// Initialize WebSocket
		this.websocket(apiKey);

		// Initialize API service
		this.api = new APIService(apiKey);

		this.bets = new BetManager(this);

		// Inicializar o gerenciador de guildas
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

// const client = new Betting("12");
// const guild = client.guilds.cache.get("123");
// if (!guild) throw new Error("1");

// const bet = client.bets.fetch("123");
// const data = guild.bets.cache.get("123");
// client.bets.fetch("123");
// guild.bets.fetch("123");
