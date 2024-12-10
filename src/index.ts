import WebSocket from "ws";
import { assertString } from "./assertions/literal";
import { Routes } from "./lib/routes";
import { BetModule } from "./modules/bets";
import { CredentialModule } from "./modules/credentials";
import { APIService } from "./services";
import { GlobalCacheService } from "./services/cache/global";
import { Status } from "./structures";
import { type APIEvents, TypedEventEmitter } from "./types";

/**
 * Betting - Manages communication with the API, including WebSocket for real-time events.
 */
export class Betting extends TypedEventEmitter<APIEvents> {
	public static apiInfo = {
		baseUrl: "http://localhost:80",
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
		this.ws = new WebSocket("ws://localhost:80", {
			headers: {
				authorization: `Bearer ${apiKey}`,
			},
		});

		this.ws.on("open", () => {
			console.log("Connected to WebSocket API.");
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
				console.error("Error processing WebSocket message:", error);
			}
		});

		this.ws.on("close", () => {
			console.log("WebSocket disconnected.");
		});
	}

	async status(): Promise<Status> {
		const { response } = await this.api.request(Routes.status());
		return new Status(response);
	}
}

export * from "./structures";
export * from "./types";
