import type { Route } from "@/lib/routes";
import type {
	RESTGetAPIAllBlacklistQuery,
	RESTGetAPIAllBlacklistResponse,
	RESTGetAPIAllScamsQuery,
	RESTGetAPIAllScamsResponse,
	RESTGetAPIBlacklistBaseQuery,
	RESTGetAPIBlacklistStatsResponse,
	RESTGetAPICredentialBaseQuery,
	RESTGetAPICredentialResponse,
	RESTGetAPIGuildBetBulkResponse,
	RESTGetAPIGuildBetCountResponse,
	RESTGetAPIGuildBetResponse,
	RESTGetAPIGuildBetStatsResponse,
	RESTGetAPIGuildBetThreadWaitTimeResponse,
	RESTGetAPIGuildBetsQuery,
	RESTGetAPIGuildBetsResponse,
	RESTGetAPIGuildMediatorResponse,
	RESTGetAPIGuildMediatorsResponse,
	RESTGetAPIGuildResponse,
	RESTGetAPIGuildStatsResponse,
	RESTGetAPIGuildUserResponse,
	RESTGetAPIGuildUserStatsResponse,
	RESTGetAPIGuildUsersResponse,
	RESTGetAPIGuildsResponse,
	RESTGetAPIMediatorStatsResponse,
	RESTGetAPIScamBaseQuery,
	RESTGetAPIScamResponse,
	RESTGetAPIScamStatsResponse,
	RESTGetAPISimilarScamsResponse,
	RESTGetAPIStatusResponse,
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

export interface APIEndpoints {
	status: {
		response: RESTGetAPIStatusResponse;
	};
	"credentials/get": {
		response: RESTGetAPICredentialResponse;
		query: RESTGetAPICredentialBaseQuery;
	};
	"credentials/generate": {
		method: "POST";
		response: RESTGetAPICredentialResponse;
		body: RESTPostAPICredentialJSONBody;
	};
	"blacklist/getById": {
		response: RESTGetAPIAllBlacklistResponse;
	};
	"blacklist/getAll": {
		response: RESTGetAPIAllBlacklistResponse;
		query: RESTGetAPIAllBlacklistQuery;
	};
	"blacklist/add": {
		method: "POST";
		response: RESTGetAPIAllBlacklistResponse;
		body: RESTPostAPIBlacklistCreateBody;
	};
	"blacklist/update": {
		method: "PATCH";
		response: RESTGetAPIAllBlacklistResponse;
		body: RESTPatchAPIBlacklistUpdateBody;
		query: RESTGetAPIBlacklistBaseQuery;
	};
	"blacklist/delete": {
		method: "DELETE";
		response: RESTGetAPIAllBlacklistResponse;
		query: RESTGetAPIBlacklistBaseQuery;
	};
	"blacklist/fetchStats": {
		method: "GET";
		response: RESTGetAPIBlacklistStatsResponse;
	};
	"scams/getById": {
		response: RESTGetAPIScamResponse;
	};
	"scams/getSimilar": {
		response: RESTGetAPISimilarScamsResponse;
	};
	"scams/getAll": {
		response: RESTGetAPIAllScamsResponse;
		query: RESTGetAPIAllScamsQuery;
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
	"scams/fetchStats": {
		method: "GET";
		response: RESTGetAPIScamStatsResponse;
	};
	"guilds/bets/get": {
		response: RESTGetAPIGuildBetResponse;
	};
	"bets/fetch": {
		response: RESTGetAPIGuildBetResponse;
	};
	"guilds/bets/getByChannelId": {
		response: RESTGetAPIGuildBetResponse;
	};
	"guilds/bets/getAll": {
		response: RESTGetAPIGuildBetsResponse;
		query: RESTGetAPIGuildBetsQuery;
	};
	"bets/fetchAll": {
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
	"guilds/bets/getStats": {
		response: RESTGetAPIGuildBetStatsResponse;
	};
	"bets/fetchStats": {
		response: RESTGetAPIGuildBetStatsResponse;
	};
	"guilds/bets/getCount": {
		response: RESTGetAPIGuildBetCountResponse;
	};
	"bets/fetchCount": {
		response: RESTGetAPIGuildBetCountResponse;
	};
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
	"guilds/get": {
		response: RESTGetAPIGuildResponse;
	};
	"guilds/getAll": {
		response: RESTGetAPIGuildsResponse;
	};
	"guilds/getStats": {
		response: RESTGetAPIGuildStatsResponse;
	};
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
	"guilds/delete": {
		method: "DELETE";
		response: RESTGetAPIGuildResponse;
	};
	"guilds/scams/getStats": {
		method: "GET";
		response: RESTGetAPIScamStatsResponse;
	};
	"guilds/blacklist/getStats": {
		method: "GET";
		response: RESTGetAPIBlacklistStatsResponse;
	};
	"guilds/users/get": {
		response: RESTGetAPIGuildUserResponse;
	};
	"users/fetch": {
		response: RESTGetAPIGuildUserResponse;
	};
	"guilds/users/getAll": {
		response: RESTGetAPIGuildUsersResponse;
	};
	"users/fetchAll": {
		response: RESTGetAPIGuildUsersResponse;
	};
	"guilds/users/getStats": {
		response: RESTGetAPIGuildUserStatsResponse;
	};
	"users/fetchStats": {
		response: RESTGetAPIGuildUserStatsResponse;
	};
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
		response: RESTGetAPIGuildMediatorResponse;
	};
	"guilds/mediators/get": {
		response: RESTGetAPIGuildMediatorResponse;
	};
	"mediators/fetch": {
		response: RESTGetAPIGuildMediatorResponse;
	};
	"guilds/mediators/getAll": {
		response: RESTGetAPIGuildMediatorsResponse;
	};
	"mediators/fetchAll": {
		response: RESTGetAPIGuildMediatorsResponse;
	};
	"guilds/mediators/getStats": {
		response: RESTGetAPIMediatorStatsResponse;
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
	"mediators/fetchStats": {
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
