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
    getById: (betId: string) => Route<"bets/getById">(`api/v1/bets/${betId}`),
    getByChannelId: (channelId: string) => Route<"bets/getByChannelId">(`api/v1/bets/channel/${channelId}`),
    getAll: () => Route<"bets/getAll">("api/v1/bets"),
    create: () => Route<"bets/create">(`api/v1/bets`),
    update: (betId: string) => Route<"bets/update">(`api/v1/bets/${betId}`),
    delete: (betId: string) => Route<"bets/delete">(`api/v1/bets/${betId}`),
    metrics: (guildId: string) => Route<"bets/metrics">(`api/v1/bets/metrics/${guildId}`),
    count: () => Route<"bets/count">("api/v1/bets/count"),
    has: (betId: string) => Route<"bets/has">(`api/v1/bets/has/${betId}`),
    bulk: {
      create: () => Route<"bets/bulkCreate">(`api/v1/bets/bulkDelete`),
      delete:  () => Route<"bets/bulkDelete">(`api/v1/bets/bulkDelete`),
    }
  },
} satisfies IRoutes;
