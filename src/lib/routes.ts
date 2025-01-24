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
  },
  scams: {
    getByName: (targetName: string) => Route<"scams/getById">(`api/v1/scams/${targetName}`),
    getSimilar: (targetName: string) => Route<"scams/getSimilar">(`api/v1/scams/similar/${targetName}`),
    getAll: () => Route<"scams/getAll">("api/v1/scams"),
    add: () => Route<"scams/add">("api/v1/scams"),
    update: (targetName: string) => Route<"scams/update">(`api/v1/scams/${targetName}`),
    delete: (targetName: string) => Route<"scams/delete">(`api/v1/scams/${targetName}`),
  },
  bets: {
    // fetch: (betId: string) => Route<"bets/fetch">(`api/v1/bets/${betId}`),
    getById: (guildId: string,betId: string) => Route<"bets/getById">(`api/v1/guilds/${guildId}/bets/${betId}`),
    getByChannelId: (guildId: string,channelId: string) => Route<"bets/getByChannelId">(`api/v1/guilds/${guildId}/bets/channel/${channelId}`),
    getChannelIdsFromPlayerId: (guildId: string) => Route<"bets/getChannelIdsFromPlayerId">(`api/v1/guilds/${guildId}/bets/channels/players`),
    getAll: (guildId: string) => Route<"bets/getAll">(`api/v1/guilds/${guildId}/bets`),
    // fetchAll: () => Route<"bets/fetchAll">(`api/v1/bets`),
    create: (guildId: string) => Route<"bets/create">(`api/v1/guilds/${guildId}/bets`),
    update: (guildId: string, betId: string) => Route<"bets/update">(`api/v1/guilds/${guildId}/bets/${betId}`),
    delete: (guildId: string, betId: string) => Route<"bets/delete">(`api/v1/guilds/${guildId}/bets/${betId}`),
    // fetchMetrics: () => Route<"bets/fetchMetrics">(`api/v1/bets/metrics`),
    metrics: (guildId: string) => Route<"bets/metrics">(`api/v1/guilds/${guildId}/bets/metrics`),
    // fetchCount: () => Route<"bets/fetchCount">(`api/v1/bets/count`),
    count: (guildId: string) => Route<"bets/count">(`api/v1/guilds/${guildId}/bets/count`),
    bulk: {
      create: (guildId: string) => Route<"bets/bulkCreate">(`api/v1/guilds/${guildId}/bets/bulk/create`),
      delete:  (guildId: string) => Route<"bets/bulkDelete">(`api/v1/guilds/${guildId}/bets/bulk/delete`),
    },
    getThreadWaitTime: (guildId: string) => Route<"bets/getThreadWaitTime">(`api/v1/guilds/${guildId}/bets/threads/wait-time`),
  },
} satisfies IRoutes;
