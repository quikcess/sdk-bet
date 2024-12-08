import { bettingApi } from "./index.test";

// console.time("bet");
// bettingApi.bets.getAll("0").then(console.log);
// console.timeEnd("bet");

// bettingApi.bets.getById("123").then(console.log);
// bettingApi.bets.getByChannelId("123456789").then(console.log);

bettingApi.bets.create({
  betId: "123",
  channelId: "123",
  guildId: "",
  platform: "mobile",
  format: "",
  mode: "1v1",
  players: [],
  status: "waiting",
  type: "regenerative",
  roomId: 0,
  value: "",
  queueChannelId: "",
  mediatorId: "",
  wo: false,
  revenge: false,
  emulators: 0,
  gelType: "normal",
  createdAt: new Date(),
  updatedAt: new Date(),
  startedAt: new Date(),
  closedAt: null,
  expireAt: new Date()
}).then(console.log);

