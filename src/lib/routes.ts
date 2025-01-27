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
  guilds: {
    get: (guildId: string) => Route<"guilds/get">(`api/v1/guilds/${guildId}`),
    getAll: () => Route<"guilds/getAll">(`api/v1/guilds`),
    getStats: () => Route<"guilds/getStats">(`api/v1/guilds/stats`),
    create: () => Route<"guilds/create">(`api/v1/guilds`),
    delete: (guildId: string) => Route<"guilds/delete">(`api/v1/guilds/${guildId}`),
    update: (guildId: string) => Route<"guilds/update">(`api/v1/guilds/${guildId}`),
    bets: {
      get: (guildId: string, betId: string) => Route<"guilds/bets/get">(`api/v1/guilds/${guildId}/bets/${betId}`),
      getByChannelId: (guildId: string,channelId: string) => Route<"guilds/bets/getByChannelId">(`api/v1/guilds/${guildId}/bets/channel/${channelId}`),
      getChannelIdsFromPlayerId: (guildId: string) => Route<"guilds/bets/getChannelIdsFromPlayerId">(`api/v1/guilds/${guildId}/bets/channels/players`),
      getAll: (guildId: string) => Route<"guilds/bets/getAll">(`api/v1/guilds/${guildId}/bets`),
      create: (guildId: string) => Route<"guilds/bets/create">(`api/v1/guilds/${guildId}/bets`),
      update: (guildId: string, betId: string) => Route<"guilds/bets/update">(`api/v1/guilds/${guildId}/bets/${betId}`),
      delete: (guildId: string, betId: string) => Route<"guilds/bets/delete">(`api/v1/guilds/${guildId}/bets/${betId}`),
      getStats: (guildId: string) => Route<"guilds/bets/getStats">(`api/v1/guilds/${guildId}/bets/stats`),
      getCount: (guildId: string) => Route<"guilds/bets/getCount">(`api/v1/guilds/${guildId}/bets/count`),
      getThreadWaitTime: (guildId: string) => Route<"guilds/bets/getThreadWaitTime">(`api/v1/guilds/${guildId}/bets/threads/wait-time`),
      bulk: {
        create: (guildId: string) => Route<"guilds/bets/bulkCreate">(`api/v1/guilds/${guildId}/bets/bulk/create`),
        delete:  (guildId: string) => Route<"guilds/bets/bulkDelete">(`api/v1/guilds/${guildId}/bets/bulk/delete`),
      },
    },
    users: {
      get: (guildId: string, userId: string) => Route<"guilds/users/get">(`api/v1/guilds/${guildId}/users/${userId}`),
      getAll: (guildId: string) => Route<"guilds/users/getAll">(`api/v1/guilds/${guildId}/users`),
      getStats: () => Route<"guilds/users/getStats">(`api/v1/guilds/users/stats`),
      getStatsFromUser: (guildId:string, userId:string) => Route<"guilds/users/getStats">(`api/v1/guilds/${guildId}/users/${userId}/stats`),
      create: (guildId: string) => Route<"guilds/users/create">(`api/v1/guilds/${guildId}/users`),
      update: (guildId: string, userId: string) => Route<"guilds/users/update">(`api/v1/guilds/${guildId}/users/${userId}`),
      delete: (guildId: string, userId: string) => Route<"guilds/users/delete">(`api/v1/guilds/${guildId}/users/${userId}`),
    },
    mediators: {
      get: (guildId: string, userId: string) => Route<"guilds/mediators/get">(`api/v1/guilds/${guildId}/mediators/${userId}`),
      getAll: (guildId: string) => Route<"guilds/mediators/getAll">(`api/v1/guilds/${guildId}/mediators`),
      getStats: () => Route<"guilds/mediators/getStats">(`api/v1/guilds/mediators/stats`),
      getStatsFromUser: (guildId:string, userId:string) => Route<"guilds/mediators/getStats">(`api/v1/guilds/${guildId}/mediators/${userId}/stats`),
      create: (guildId: string) => Route<"guilds/mediators/create">(`api/v1/guilds/${guildId}/mediators`),
      update: (guildId: string, userId: string) => Route<"guilds/mediators/update">(`api/v1/guilds/${guildId}/mediators/${userId}`),
      delete: (guildId: string, userId: string) => Route<"guilds/mediators/delete">(`api/v1/guilds/${guildId}/mediators/${userId}`),
    },
    scams: {
      getStats: (guildId: string) => Route<"guilds/scams/getStats">(`api/v1/guilds/${guildId}/scams/stats`),
    },
    blacklist: {
      getStats: (guildId: string) => Route<"guilds/blacklist/getStats">(`api/v1/guilds/${guildId}/blacklist/stats`),
    }
  },
  credentials: {
    get: () => {
      return Route<"credentials/get">("api/v1/credentials");
    },
    generate: () => {
      return Route<"credentials/generate">("api/v1/credentials/generate-api-key");
    }
  },
  users: {
    fetch: (userId: string) => Route<"users/fetch">(`api/v1/users/${userId}`),
    fetchAll: () => Route<"users/fetchAll">(`api/v1/users`),
    fetchStats: () => Route<"users/fetchStats">(`api/v1/users/stats`),
    fetchStatsFromUser: (userId: string) => Route<"users/fetchStats">(`api/v1/users/stats/${userId}`),
  },
  mediators: {
    fetch: (userId: string) => Route<"mediators/fetch">(`api/v1/mediators/${userId}`),
    fetchAll: () => Route<"mediators/fetchAll">(`api/v1/mediators`),
    fetchStats: () => Route<"mediators/fetchStats">(`api/v1/mediators/stats`),
    fetchStatsFromUser: (userId: string) => Route<"mediators/fetchStats">(`api/v1/mediators/stats/${userId}`),
  },
  bets: {
    fetch: (betId: string) => Route<"bets/fetch">(`api/v1/bets/${betId}`),
    fetchAll: () => Route<"bets/fetchAll">(`api/v1/bets`),
    fetchStats: () => Route<"bets/fetchStats">(`api/v1/bets/stats`),
    fetchCount: () => Route<"bets/fetchCount">(`api/v1/bets/count`),
  },
  scams: {
    getByName: (targetName: string) => Route<"scams/getById">(`api/v1/scams/${targetName}`),
    getSimilar: (targetName: string) => Route<"scams/getSimilar">(`api/v1/scams/similar/${targetName}`),
    getAll: () => Route<"scams/getAll">("api/v1/scams"),
    add: () => Route<"scams/add">("api/v1/scams"),
    update: (targetName: string) => Route<"scams/update">(`api/v1/scams/${targetName}`),
    delete: (targetName: string) => Route<"scams/delete">(`api/v1/scams/${targetName}`),
    fetchStats: () => Route<"scams/fetchStats">(`api/v1/scams/stats`),
  },
  blacklist: {
    getById: (targetId: string) => Route<"blacklist/getById">(`api/v1/blacklist/${targetId}`),
    getAll: () => Route<"blacklist/getAll">("api/v1/blacklist"),
    add: () => Route<"blacklist/add">(`api/v1/blacklist`),
    update: (targetId: string) => Route<"blacklist/update">(`api/v1/blacklist/${targetId}`),
    delete: (targetId: string) => Route<"blacklist/delete">(`api/v1/blacklist/${targetId}`),
    fetchStats: () => Route<"scams/fetchStats">(`api/v1/scams/stats`),
  },
} satisfies IRoutes;
