import type { Route } from "@/lib/routes";
import type {
	APIAllBets,
	APIAllBlacklist,
	APIAllScams,
	APIBet,
	APIBetAggregateMetrics,
	APIBlacklist,
	APIChannelIdsFromPlayerId,
	APICredential,
	APIPayload,
	APIScam,
	APIStatus,
	RESTGetAPIAPIChannelIdsFromPlayerIdQuery,
	RESTGetAPIAllBetsQuery,
	RESTGetAPIAllBlacklistQuery,
	RESTGetAPIAllScamsQuery,
	RESTGetAPIBetBaseQuery,
	RESTGetAPIBlacklistBaseQuery,
	RESTGetAPICredentialBaseQuery,
	RESTGetAPIScamBaseQuery,
	RESTPatchAPIBetUpdateBody,
	RESTPatchAPIBlacklistUpdateBody,
	RESTPatchAPIScamUpdateBody,
	RESTPostAPIBetCreateBody,
	RESTPostAPIBlacklistCreateBody,
	RESTPostAPICredentialJSONBody,
	RESTPostAPIScamCreateBody,
} from "@quikcess/bet-api-types/v1";

export interface APIEndpoints {
	status: {
		response: APIStatus;
	};
	"credentials/get": {
		response: APICredential;
		query: RESTGetAPICredentialBaseQuery;
	};
	"credentials/generate": {
		method: "POST";
		response: APICredential;
		body: RESTPostAPICredentialJSONBody;
	};
	"blacklist/getById": {
		response: APIBlacklist;
	};
	"blacklist/getAll": {
		response: APIAllBlacklist;
		query: RESTGetAPIAllBlacklistQuery;
	};
	"blacklist/add": {
		method: "POST";
		response: APIBlacklist;
		body: RESTPostAPIBlacklistCreateBody;
	};
	"blacklist/update": {
		method: "PATCH";
		response: APIBlacklist;
		body: RESTPatchAPIBlacklistUpdateBody;
		query: RESTGetAPIBlacklistBaseQuery;
	};
	"blacklist/delete": {
		method: "DELETE";
		response: APIBlacklist;
		query: RESTGetAPIBlacklistBaseQuery;
	};
	"blacklist/has": {
		response: boolean;
		query: RESTGetAPIBlacklistBaseQuery;
	};
	"scams/getById": {
		response: APIScam;
	};
	"scams/getSimilar": {
		response: APIScam[];
	};
	"scams/getAll": {
		response: APIAllScams;
		query: RESTGetAPIAllScamsQuery;
	};
	"scams/add": {
		method: "POST";
		response: APIScam;
		body: RESTPostAPIScamCreateBody;
	};
	"scams/update": {
		method: "PATCH";
		response: APIScam;
		body: RESTPatchAPIScamUpdateBody;
		query: RESTGetAPIScamBaseQuery;
	};
	"scams/delete": {
		method: "DELETE";
		response: APIScam;
		query: RESTGetAPIScamBaseQuery;
	};
	"scams/has": {
		response: boolean;
		query: RESTGetAPIScamBaseQuery;
	};
	"bets/getById": {
		response: APIBet;
	};
	"bets/getByChannelId": {
		response: APIBet;
	};
	"bets/getChannelIdsFromPlayerId": {
		response: APIChannelIdsFromPlayerId;
		query: RESTGetAPIAPIChannelIdsFromPlayerIdQuery;
	};
	"bets/getAll": {
		response: APIAllBets;
		query: RESTGetAPIAllBetsQuery;
	};
	"bets/create": {
		method: "POST";
		response: APIBet;
		body: RESTPostAPIBetCreateBody;
	};
	"bets/update": {
		method: "PATCH";
		response: APIBet;
		body: RESTPatchAPIBetUpdateBody;
		query: RESTGetAPIBetBaseQuery;
	};
	"bets/delete": {
		method: "DELETE";
		response: APIBet;
		query: RESTGetAPIBetBaseQuery;
	};
	"bets/metrics": {
		response: APIBetAggregateMetrics;
		query: RESTGetAPIBetBaseQuery;
	};
	"bets/count": {
		response: number;
		query: RESTGetAPIBetBaseQuery;
	};
	"bets/has": {
		response: boolean;
		query: RESTGetAPIBetBaseQuery;
	};
	"bets/bulkCreate": {
		method: "POST";
		response: APIBet[];
		body: RESTPostAPIBetCreateBody[];
	};
	"bets/bulkDelete": {
		method: "DELETE";
		response: APIBet[];
		body: string[];
	};
	"bets/getThreadWaitTime": {
		response: number;
	};
}

export type APIEndpoint = keyof APIEndpoints;

export type APIMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

type HeadersInit = Headers | Record<string, string> | [string, string][];

export type APIRequestOptions<T extends APIEndpoint> = {
	headers?: HeadersInit;
} & Omit<APIEndpoints[T], "response">;

export type APIResponse<T extends APIEndpoint> = APIPayload<
	APIEndpoints[T]["response"]
>;

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
