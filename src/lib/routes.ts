import type { APIEndpoint } from "@/types";

export type Route<T extends APIEndpoint> = string & { __route: T };
export const Route = <T extends APIEndpoint>(route: string) => route as Route<T>;

interface IRoutes {
  [k: string]: ((...args: string[]) => Route<APIEndpoint>) | IRoutes;
}

export const Routes = {
  status: () => {
    return Route<"status">("api/v1/status");
  },
  credential: () => {
    return Route<"credential">("api/v1/auth/generate-api-key");
  },
  bets: {
    get: (guildId?: string) => {
      return Route<"bets/get">(`api/v1/bets/${guildId ? guildId : ""}`);
    },
  },
} satisfies IRoutes;
