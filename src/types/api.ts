import type {
	RESTGetAPIBetStatsResponse,
	RESTGetAPIBlacklistBaseQuery,
	RESTGetAPIBlacklistResponse,
	RESTGetAPIBlacklistStatsResponse,
	RESTGetAPIBlacklistsQuery,
	RESTGetAPIBlacklistsResponse,
	RESTGetAPICredentialBaseQuery,
	RESTGetAPICredentialResponse,
	RESTGetAPIGuildBetBulkResponse,
	RESTGetAPIGuildBetCountResponse,
	RESTGetAPIGuildBetResponse,
	RESTGetAPIGuildBetStatsResponse,
	RESTGetAPIGuildBetThreadWaitTimeResponse,
	RESTGetAPIGuildBetsQuery,
	RESTGetAPIGuildBetsResponse,
	RESTGetAPIGuildBlacklistStatsResponse,
	RESTGetAPIGuildMediatorResponse,
	RESTGetAPIGuildMediatorStatsResponse,
	RESTGetAPIGuildMediatorsPaginationQuery,
	RESTGetAPIGuildMediatorsResponse,
	RESTGetAPIGuildResponse,
	RESTGetAPIGuildScamStatsResponse,
	RESTGetAPIGuildStatsResponse,
	RESTGetAPIGuildUserResponse,
	RESTGetAPIGuildUserStatsResponse,
	RESTGetAPIGuildUsersPaginationQuery,
	RESTGetAPIGuildUsersResponse,
	RESTGetAPIGuildsPaginationQuery,
	RESTGetAPIGuildsResponse,
	RESTGetAPIMediatorResponse,
	RESTGetAPIMediatorStatsResponse,
	RESTGetAPIMediatorsResponse,
	RESTGetAPIScamBaseQuery,
	RESTGetAPIScamResponse,
	RESTGetAPIScamStatsResponse,
	RESTGetAPIScamsQuery,
	RESTGetAPIScamsResponse,
	RESTGetAPISimilarScamsResponse,
	RESTGetAPIStatusResponse,
	RESTGetAPIUserResponse,
	RESTGetAPIUserStatsResponse,
	RESTGetAPIUsersResponse,
	RESTPatchAPIBlacklistUpdateBody,
	RESTPatchAPIGuildBetUpdateBody,
	RESTPatchAPIGuildMediatorUpdateBody,
	RESTPatchAPIGuildUpdateBody,
	RESTPatchAPIGuildUserUpdateBody,
	RESTPatchAPIScamUpdateBody,
	RESTPostAPIBlacklistCreateBody,
	RESTPostAPICredentialJSONBody,
	RESTPostAPIGuildBetCreateBody,
	RESTPostAPIGuildCreateBody,
	RESTPostAPIGuildMediatorCreateBody,
	RESTPostAPIGuildUserCreateBody,
	RESTPostAPIScamCreateBody,
} from "@quikcess/bet-api-types/v1";
import type { Route } from "#quikcess/lib/routes";

export interface APIEndpoints {
	status: { response: RESTGetAPIStatusResponse };

	"credentials/get": {
		response: RESTGetAPICredentialResponse;
		query: RESTGetAPICredentialBaseQuery;
	};
	"credentials/generate": {
		method: "POST";
		response: RESTGetAPICredentialResponse;
		body: RESTPostAPICredentialJSONBody;
	};

	"blacklist/getById": { response: RESTGetAPIBlacklistResponse };
	"blacklist/getAll": {
		response: RESTGetAPIBlacklistsResponse;
		query: RESTGetAPIBlacklistsQuery;
	};
	"blacklist/add": {
		method: "POST";
		response: RESTGetAPIBlacklistResponse;
		body: RESTPostAPIBlacklistCreateBody;
	};
	"blacklist/update": {
		method: "PATCH";
		response: RESTGetAPIBlacklistResponse;
		body: RESTPatchAPIBlacklistUpdateBody;
		query: RESTGetAPIBlacklistBaseQuery;
	};
	"blacklist/delete": {
		method: "DELETE";
		response: RESTGetAPIBlacklistResponse;
		query: RESTGetAPIBlacklistBaseQuery;
	};
	"blacklist/getStats": {
		response: RESTGetAPIBlacklistStatsResponse;
	};

	"scams/getById": { response: RESTGetAPIScamResponse };
	"scams/getSimilar": { response: RESTGetAPISimilarScamsResponse };
	"scams/getAll": {
		response: RESTGetAPIScamsResponse;
		query: RESTGetAPIScamsQuery;
	};
	"scams/add": {
		method: "POST";
		response: RESTGetAPIScamResponse;
		body: RESTPostAPIScamCreateBody;
	};
	"scams/update": {
		method: "PATCH";
		response: RESTGetAPIScamResponse;
		body: RESTPatchAPIScamUpdateBody;
		query: RESTGetAPIScamBaseQuery;
	};
	"scams/delete": {
		method: "DELETE";
		response: RESTGetAPIScamResponse;
		query: RESTGetAPIScamBaseQuery;
	};
	"scams/getStats": {
		response: RESTGetAPIScamStatsResponse;
	};

	"guilds/get": { response: RESTGetAPIGuildResponse };
	"guilds/getAll": {
		response: RESTGetAPIGuildsResponse;
		query: RESTGetAPIGuildsPaginationQuery;
	};
	"guilds/getStats": { response: RESTGetAPIGuildStatsResponse };
	"guilds/create": {
		method: "POST";
		response: RESTGetAPIGuildResponse;
		body: RESTPostAPIGuildCreateBody;
	};
	"guilds/update": {
		method: "PATCH";
		response: RESTGetAPIGuildResponse;
		body: RESTPatchAPIGuildUpdateBody;
	};
	"guilds/delete": { method: "DELETE"; response: RESTGetAPIGuildResponse };

	"guilds/scams/getStats": {
		response: RESTGetAPIGuildScamStatsResponse;
	};
	"guilds/blacklist/getStats": {
		response: RESTGetAPIGuildBlacklistStatsResponse;
	};

	"guilds/bets/get": { response: RESTGetAPIGuildBetResponse };
	"guilds/bets/getByChannelId": { response: RESTGetAPIGuildBetResponse };
	"guilds/bets/getAll": {
		response: RESTGetAPIGuildBetsResponse;
		query: RESTGetAPIGuildBetsQuery;
	};
	"guilds/bets/create": {
		method: "POST";
		response: RESTGetAPIGuildBetResponse;
		body: RESTPostAPIGuildBetCreateBody;
	};
	"guilds/bets/update": {
		method: "PATCH";
		response: RESTGetAPIGuildBetResponse;
		body: RESTPatchAPIGuildBetUpdateBody;
	};
	"guilds/bets/delete": {
		method: "DELETE";
		response: RESTGetAPIGuildBetResponse;
	};
	"guilds/bets/getStats": { response: RESTGetAPIGuildBetStatsResponse };
	"guilds/bets/getCount": { response: RESTGetAPIGuildBetCountResponse };
	"guilds/bets/bulkCreate": {
		method: "POST";
		response: RESTGetAPIGuildBetBulkResponse;
		body: RESTPostAPIGuildBetCreateBody[];
	};
	"guilds/bets/bulkDelete": {
		method: "DELETE";
		response: RESTGetAPIGuildBetBulkResponse;
		body: string[];
	};
	"guilds/bets/getThreadWaitTime": {
		response: RESTGetAPIGuildBetThreadWaitTimeResponse;
	};

	"guilds/users/get": { response: RESTGetAPIGuildUserResponse };
	"guilds/users/getAll": {
		response: RESTGetAPIGuildUsersResponse;
		query: RESTGetAPIGuildUsersPaginationQuery;
	};
	"guilds/users/getStats": { response: RESTGetAPIGuildUserStatsResponse };
	"guilds/users/create": {
		method: "POST";
		response: RESTGetAPIGuildUserResponse;
		body: RESTPostAPIGuildUserCreateBody;
	};
	"guilds/users/update": {
		method: "PATCH";
		response: RESTGetAPIGuildUserResponse;
		body: RESTPatchAPIGuildUserUpdateBody;
	};
	"guilds/users/delete": {
		method: "DELETE";
		response: RESTGetAPIGuildUserResponse;
	};

	"guilds/mediators/get": { response: RESTGetAPIGuildMediatorResponse };
	"guilds/mediators/getAll": {
		response: RESTGetAPIGuildMediatorsResponse;
		query: RESTGetAPIGuildMediatorsPaginationQuery;
	};
	"guilds/mediators/getStats": {
		response: RESTGetAPIGuildMediatorStatsResponse;
	};
	"guilds/mediators/create": {
		method: "POST";
		response: RESTGetAPIGuildMediatorResponse;
		body: RESTPostAPIGuildMediatorCreateBody;
	};
	"guilds/mediators/update": {
		method: "PATCH";
		response: RESTGetAPIGuildMediatorResponse;
		body: RESTPatchAPIGuildMediatorUpdateBody;
	};
	"guilds/mediators/delete": {
		method: "DELETE";
		response: RESTGetAPIGuildMediatorResponse;
	};

	"bets/get": { response: RESTGetAPIGuildBetResponse };
	"bets/getAll": {
		response: RESTGetAPIGuildBetsResponse;
		query: RESTGetAPIGuildBetsQuery;
	};
	"bets/getStats": { response: RESTGetAPIBetStatsResponse };
	"bets/getCount": { response: RESTGetAPIGuildBetCountResponse };

	"users/get": { response: RESTGetAPIUserResponse };
	"users/getAll": {
		response: RESTGetAPIUsersResponse;
		query: RESTGetAPIGuildUsersPaginationQuery;
	};
	"users/getStats": { response: RESTGetAPIUserStatsResponse };

	"mediators/get": { response: RESTGetAPIMediatorResponse };
	"mediators/getAll": {
		response: RESTGetAPIMediatorsResponse;
		query: RESTGetAPIGuildMediatorsPaginationQuery;
	};
	"mediators/getStats": {
		response: RESTGetAPIMediatorStatsResponse;
	};
}

export type APIEndpoint = keyof APIEndpoints;

export type APIMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

type HeadersInit = Headers | Record<string, string> | [string, string][];

export type APIRequestOptions<T extends APIEndpoint> = {
	headers?: HeadersInit;
} & Omit<APIEndpoints[T], "response">;

export type APIResponse<T extends APIEndpoint> = APIEndpoints[T]["response"];

export type QueryOrBody =
	| { query: any }
	| { body: any }
	| { method: APIMethod };

export type APIRequestArgs<
	T extends APIEndpoint,
	U extends APIRequestOptions<T> = APIRequestOptions<T>,
> = U extends QueryOrBody
	? [path: Route<T>, options: U]
	: [path: Route<T>, options?: U];
