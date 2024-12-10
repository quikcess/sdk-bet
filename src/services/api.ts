import { BetAPIError } from "@/structures";
import type {
	APIEndpoint,
	APIRequestArgs,
	APIRequestOptions,
	APIResponse,
} from "@/types";
import type { APIVersion } from "@quikcess/bet-api-types/v1";

export class APIService {
	public readonly baseUrl = "http://localhost:80";
	public readonly version: APIVersion<1> = "v1";

	constructor(protected readonly apiKey: string) {}

	async request<T extends APIEndpoint>(
		...[path, options]: APIRequestArgs<T>
	): Promise<APIResponse<T>> {
		const { url, init } = this.parseRequestOptions(path, options);

		const response = await fetch(url, init).catch((err) => {
			throw new BetAPIError(err.code, err.message);
		});

		if (response.status === 404) {
			throw new BetAPIError("NOT_FOUND", "Route does not exist");
		}

		if (response.status === 413) {
			throw new BetAPIError("PAYLOAD_TOO_LARGE", "Payload too large");
		}

		if (response.status === 429) {
			throw new BetAPIError("RATE_LIMIT_EXCEEDED", "Rate limit exceeded");
		}

		if (response.status === 502 || response.status === 504) {
			throw new BetAPIError("SERVER_UNAVAILABLE", "Server unavailable");
		}

		const data = (await response.json().catch(() => {
			throw new BetAPIError("CANNOT_PARSE_RESPONSE", "Try again later");
		})) as APIResponse<T>;

		if (!data || data.status === "error" || !response.ok) {
			throw new BetAPIError(data?.code || "COMMON_ERROR");
		}

		return data;
	}

	private parseRequestOptions(
		path: string,
		options?: APIRequestOptions<APIEndpoint>,
	) {
		const init: RequestInit = options || {};

		init.method = init.method || "GET";
		init.headers = {
			Accept: "application/json",
			...(init.headers || {}),
			Authorization: this.apiKey,
		};

		const url = new URL(path, `${this.baseUrl}/${this.version}`);

		if ("query" in init && init.query) {
			const query = new URLSearchParams(init.query as Record<string, string>);
			url.search = query.toString();
			init.query = undefined;
		}

		if ("body" in init && init.body && !(init.body instanceof Buffer)) {
			init.body = JSON.stringify(init.body);
			init.headers = {
				...init.headers,
				"Content-Type": "application/json",
			};
		}

		return { url, init };
	}
}
