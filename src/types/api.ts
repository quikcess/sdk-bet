import type { Route } from "@/lib/routes";
import type { APIPayload, APIStatusInfo } from "@quikcess/bet-api-types/v1";

export interface APIEndpoints {
  status: {
    response: APIStatusInfo;
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
