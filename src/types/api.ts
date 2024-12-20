import type { Route } from "@/lib/routes";
import type {
  APIAllBets,
  APIAllBlacklist,
  APIBet,
  APIBetAggregateMetrics,
  APIBlacklist,
  APICredential,
  APIPayload,
  APIStatus,
  RESTGetAPIAllBetsQuery,
  RESTGetAPIAllBlacklistQuery,
  RESTGetAPIBetBaseQuery,
  RESTGetAPIBlacklistBaseQuery,
  RESTGetAPICredentialBaseQuery,
  RESTPatchAPIBetUpdateBody,
  RESTPatchAPIBlacklistUpdateBody,
  RESTPostAPIBetCreateBody,
  RESTPostAPIBlacklistCreateBody,
  RESTPostAPICredentialJSONBody,
} from "@quikcess/bet-api-types/v1";

export interface APIEndpoints {
	status: {
		response: APIStatus;
	};
	"credential/get": {
		response: APICredential;
		query: RESTGetAPICredentialBaseQuery;
	};
	"credential/generate": {
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
	"bets/getById": {
		response: APIBet;
	};
	"bets/getByChannelId": {
		response: APIBet;
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
