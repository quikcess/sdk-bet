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
  credentials: {
    get: () => {
      return Route<"credential/get">("api/v1/credentials");
    },
    generate: () => {
      return Route<"credential/generate">("api/v1/credentials/generate-api-key");
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
  scam: {
    getByName: (targetName: string) => Route<"scam/getById">(`api/v1/scam/${targetName}`),
    getSimilar: (targetName: string) => Route<"scam/getSimilar">(`api/v1/scam/similar/${targetName}`),
    getAll: () => Route<"scam/getAll">("api/v1/scam"),
    add: () => Route<"scam/add">(`api/v1/scam`),
    update: (targetName: string) => Route<"scam/update">(`api/v1/scam/${targetName}`),
    delete: (targetName: string) => Route<"scam/delete">(`api/v1/scam/${targetName}`),
    has: (targetName: string) => Route<"scam/has">(`api/v1/scam/has/${targetName}`),
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
    has: (betId: string) => Route<"bets/has">(`api/v1/bets/has/${betId}`),
    bulk: {
      create: () => Route<"bets/bulkCreate">(`api/v1/bets/bulk/create`),
      delete:  () => Route<"bets/bulkDelete">(`api/v1/bets/bulk/delete`),
    }
  },
} satisfies IRoutes;
