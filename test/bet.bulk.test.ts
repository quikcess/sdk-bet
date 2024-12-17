import { bettingApi } from "./index.test";

bettingApi.bets.bulkCreate([
  {
    betId: "098",
    channelId: "123",
    guildId: "123", // Err
    platform: "mobile",
    format: "Normal",
    mode: "1v1",
    players: [{
      userId: "1",
      wins: 0,
      loses: 0,
      consecutives: 0,
    }],
    status: "pending",
    type: "customized",
    roomId: 0,
    value: 3,
    queueChannelId: "123",
    mediatorId: "123",
    wo: false,
    revenge: false,
    emulators: 0,
    gelType: "normal",
    gelCount: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    startedAt: new Date().toISOString(),
    closedAt: null,
    logs: {
      createdUrl: "",
      startedUrl: "",
      victoryUrl: "",
      closedUrl: "",
    },
  },
  {
    betId: "099",
    channelId: "123",
    guildId: "123", // Err
    platform: "mobile",
    format: "Normal",
    mode: "1v1",
    players: [{
      userId: "1",
      wins: 0,
      loses: 0,
      consecutives: 0,
    }],
    status: "pending",
    type: "customized",
    roomId: 0,
    value: 3,
    queueChannelId: "123",
    mediatorId: "123",
    wo: false,
    revenge: false,
    emulators: 0,
    gelType: "normal",
    gelCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    startedAt: new Date().toISOString(),
    closedAt: null,
    logs: {
      createdUrl: "",
      startedUrl: "",
      victoryUrl: "",
      closedUrl: "",
    },
  }
]).then((data)=> {
  console.log(data)
});

