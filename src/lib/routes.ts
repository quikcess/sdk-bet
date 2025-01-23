import { APIEndpoint } from "@/types/index";

export type Route<T extends APIEndpoint> = string & { __route: T };
export const Route = <T extends APIEndpoint>(route: string) => route as Route<T>;

interface IRoutes {
  [k: string]: ((...args: string[]) => Route<APIEndpoint>) | IRoutes;
}

export const Routes = {
  status: () => {
    return Route<"status">("api/v1/status");
  },
  credentials: {
    get: () => {
      return Route<"credentials/get">("api/v1/credentials");
    },
    generate: () => {
      return Route<"credentials/generate">("api/v1/credentials/generate-api-key");
    }
  },
  blacklist: {
    getById: (targetId: string) => Route<"blacklist/getById">(`api/v1/blacklist/${targetId}`),
    getAll: () => Route<"blacklist/getAll">("api/v1/blacklist"),
    add: () => Route<"blacklist/add">(`api/v1/blacklist`),
    update: (targetId: string) => Route<"blacklist/update">(`api/v1/blacklist/${targetId}`),
    delete: (targetId: string) => Route<"blacklist/delete">(`api/v1/blacklist/${targetId}`),
    has: (targetId: string) => Route<"blacklist/has">(`api/v1/blacklist/has/${targetId}`),
  },
  scams: {
    getByName: (targetName: string) => Route<"scams/getById">(`api/v1/scams/${targetName}`),
    getSimilar: (targetName: string) => Route<"scams/getSimilar">(`api/v1/scams/similar/${targetName}`),
    getAll: () => Route<"scams/getAll">("api/v1/scams"),
    add: () => Route<"scams/add">("api/v1/scams"),
    update: (targetName: string) => Route<"scams/update">(`api/v1/scams/${targetName}`),
    delete: (targetName: string) => Route<"scams/delete">(`api/v1/scams/${targetName}`),
    has: (targetName: string) => Route<"scams/has">(`api/v1/scams/has/${targetName}`),
  },
  bets: {
    getById: (betId: string) => Route<"bets/getById">(`api/v1/bets/${betId}`),
    getByChannelId: (channelId: string) => Route<"bets/getByChannelId">(`api/v1/bets/channel/${channelId}`),
    getChannelIdsFromPlayerId: () => Route<"bets/getChannelIdsFromPlayerId">(`api/v1/bets/channels/players`),
    getAll: () => Route<"bets/getAll">("api/v1/bets"),
    create: () => Route<"bets/create">(`api/v1/bets`),
    update: (betId: string) => Route<"bets/update">(`api/v1/bets/${betId}`),
    delete: (betId: string) => Route<"bets/delete">(`api/v1/bets/${betId}`),
    metrics: () => Route<"bets/metrics">(`api/v1/bets/metrics`),
    count: () => Route<"bets/count">("api/v1/bets/count"),
    bulk: {
      create: () => Route<"bets/bulkCreate">(`api/v1/bets/bulk/create`),
      delete:  () => Route<"bets/bulkDelete">(`api/v1/bets/bulk/delete`),
    },
    getThreadWaitTime: (guildId: string) => Route<"bets/getThreadWaitTime">(`api/v1/bets/${guildId}/threads/wait-time`),
  },
} satisfies IRoutes;
