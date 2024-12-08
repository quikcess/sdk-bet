import type { Route } from "@/lib/routes";
import type {
  APICredentialInfo,
  APIPayload,
  APIStatusInfo,
  RESTPostAPICredentialJSONBody,
  APIAllBetsResult,
  RESTGetAPIBetBaseQuery,
  RESTGetAPIBetCreateBody,
  APIBetResult,
  RESTGetAPIBetUpdateBody,
  APIBetAggregateMetricsResult,
  RESTGetAPIAllBetsQuery
} from "@quikcess/bet-api-types/v1";

export interface APIEndpoints {
  status: {
    response: APIStatusInfo;
  };
  credential: {
    method: "POST";
    response: APICredentialInfo;
    body: RESTPostAPICredentialJSONBody;
  };
  "bets/getById": {
    response: APIBetResult;
  };
  "bets/getByChannelId": {
    response: APIBetResult;
  };
  "bets/getAll": {
    response: APIAllBetsResult;
    query: RESTGetAPIAllBetsQuery;
  };
  "bets/create": {
    method: "POST",
    response: APIBetResult;
    body: RESTGetAPIBetCreateBody;
  };
  "bets/update": {
    method: "PATCH",
    response: APIBetResult;
    body: RESTGetAPIBetUpdateBody;
  };
  "bets/delete": {
    method: "DELETE",
    response: undefined;
  };
  "bets/metrics": {
    response: APIBetAggregateMetricsResult;
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
    method: "POST",
    response: APIBetResult[];
    body: RESTGetAPIBetCreateBody;
  };
  "bets/bulkDelete": {
    method: "DELETE",
    response: undefined;
    body: string[];
  };
}

export type APIEndpoint = keyof APIEndpoints;

export type APIMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

type HeadersInit = Headers | Record<string, string> | [string, string][];

export type APIRequestOptions<T extends APIEndpoint> = {
  headers?: HeadersInit;
} & Omit<APIEndpoints[T], "response">;

export type APIResponse<T extends APIEndpoint> = APIPayload<APIEndpoints[T]["response"]>;

export type QueryOrBody = { query: any } | { body: any } | { method: APIMethod };

export type APIRequestArgs<
  T extends APIEndpoint,
  U extends APIRequestOptions<T> = APIRequestOptions<T>
> = U extends QueryOrBody ? [path: Route<T>, options: U] : [path: Route<T>, options?: U];
