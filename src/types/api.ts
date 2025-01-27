import type { Route } from "@/lib/routes";
import type {
	RESTGetAPIAPIChannelIdsFromPlayerIdQuery,
	RESTGetAPIAllBetsQuery,
	RESTGetAPIAllBetsResponse,
	RESTGetAPIAllBlacklistQuery,
	RESTGetAPIAllBlacklistResponse,
	RESTGetAPIAllGuildsResponse,
	RESTGetAPIAllMediatorsResponse,
	RESTGetAPIAllScamsQuery,
	RESTGetAPIAllScamsResponse,
	RESTGetAPIAllUsersResponse,
	RESTGetAPIBetBulkResponse,
	RESTGetAPIBetCountResponse,
	RESTGetAPIBetResponse,
	RESTGetAPIBetStatsResponse,
	RESTGetAPIBetThreadWaitTimeResponse,
	RESTGetAPIBlacklistBaseQuery,
	RESTGetAPIBlacklistStatsResponse,
	RESTGetAPIChannelIdsFromPlayerIdResponse,
	RESTGetAPICredentialBaseQuery,
	RESTGetAPICredentialResponse,
	RESTGetAPIGuildResponse,
	RESTGetAPIGuildStatsResponse,
	RESTGetAPIMediatorResponse,
	RESTGetAPIMediatorStatsResponse,
	RESTGetAPIScamBaseQuery,
	RESTGetAPIScamResponse,
	RESTGetAPIScamStatsResponse,
	RESTGetAPISimilarScamsResponse,
	RESTGetAPIStatusResponse,
	RESTGetAPIUserResponse,
	RESTGetAPIUserStatsResponse,
	RESTPatchAPIBetUpdateBody,
	RESTPatchAPIBlacklistUpdateBody,
	RESTPatchAPIGuildUpdateBody,
	RESTPatchAPIMediatorUpdateBody,
	RESTPatchAPIScamUpdateBody,
	RESTPatchAPIUserUpdateBody,
	RESTPostAPIBetCreateBody,
	RESTPostAPIBlacklistCreateBody,
	RESTPostAPICredentialJSONBody,
	RESTPostAPIGuildCreateBody,
	RESTPostAPIMediatorCreateBody,
	RESTPostAPIScamCreateBody,
	RESTPostAPIUserCreateBody,
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
		response: RESTGetAPIBetResponse;
	};
	"bets/fetch": {
		response: RESTGetAPIBetResponse;
	};
	"guilds/bets/getByChannelId": {
		response: RESTGetAPIBetResponse;
	};
	"guilds/bets/getChannelIdsFromPlayerId": {
		response: RESTGetAPIChannelIdsFromPlayerIdResponse;
		query: RESTGetAPIAPIChannelIdsFromPlayerIdQuery;
	};
	"guilds/bets/getAll": {
		response: RESTGetAPIAllBetsResponse;
		query: RESTGetAPIAllBetsQuery;
	};
	"bets/fetchAll": {
		response: RESTGetAPIAllBetsResponse;
		query: RESTGetAPIAllBetsQuery;
	};
	"guilds/bets/create": {
		method: "POST";
		response: RESTGetAPIBetResponse;
		body: RESTPostAPIBetCreateBody;
	};
	"guilds/bets/update": {
		method: "PATCH";
		response: RESTGetAPIBetResponse;
		body: RESTPatchAPIBetUpdateBody;
	};
	"guilds/bets/delete": {
		method: "DELETE";
		response: RESTGetAPIBetResponse;
	};
	"guilds/bets/getStats": {
		response: RESTGetAPIBetStatsResponse;
	};
	"bets/fetchStats": {
		response: RESTGetAPIBetStatsResponse;
	};
	"guilds/bets/getCount": {
		response: RESTGetAPIBetCountResponse;
	};
	"bets/fetchCount": {
		response: RESTGetAPIBetCountResponse;
	};
	"guilds/bets/bulkCreate": {
		method: "POST";
		response: RESTGetAPIBetBulkResponse;
		body: RESTPostAPIBetCreateBody[];
	};
	"guilds/bets/bulkDelete": {
		method: "DELETE";
		response: RESTGetAPIBetBulkResponse;
		body: string[];
	};
	"guilds/bets/getThreadWaitTime": {
		response: RESTGetAPIBetThreadWaitTimeResponse;
	};
	"guilds/get": {
		response: RESTGetAPIGuildResponse;
	};
	"guilds/getAll": {
		response: RESTGetAPIAllGuildsResponse;
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
		response: RESTGetAPIUserResponse;
	};
	"users/fetch": {
		response: RESTGetAPIUserResponse;
	};
	"guilds/users/getAll": {
		response: RESTGetAPIAllUsersResponse;
	};
	"users/fetchAll": {
		response: RESTGetAPIAllUsersResponse;
	};
	"guilds/users/getStats": {
		response: RESTGetAPIUserStatsResponse;
	};
	"users/fetchStats": {
		response: RESTGetAPIUserStatsResponse;
	};
	"guilds/users/create": {
		method: "POST";
		response: RESTGetAPIUserResponse;
		body: RESTPostAPIUserCreateBody;
	};
	"guilds/users/update": {
		method: "PATCH";
		response: RESTGetAPIUserResponse;
		body: RESTPatchAPIUserUpdateBody;
	};
	"guilds/users/delete": {
		method: "DELETE";
		response: RESTGetAPIMediatorResponse;
	};
	"guilds/mediators/get": {
		response: RESTGetAPIMediatorResponse;
	};
	"mediators/fetch": {
		response: RESTGetAPIMediatorResponse;
	};
	"guilds/mediators/getAll": {
		response: RESTGetAPIAllMediatorsResponse;
	};
	"mediators/fetchAll": {
		response: RESTGetAPIAllMediatorsResponse;
	};
	"guilds/mediators/getStats": {
		response: RESTGetAPIMediatorStatsResponse;
	};
	"guilds/mediators/create": {
		method: "POST";
		response: RESTGetAPIMediatorResponse;
		body: RESTPostAPIMediatorCreateBody;
	};
	"guilds/mediators/update": {
		method: "PATCH";
		response: RESTGetAPIMediatorResponse;
		body: RESTPatchAPIMediatorUpdateBody;
	};
	"guilds/mediators/delete": {
		method: "DELETE";
		response: RESTGetAPIMediatorResponse;
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
