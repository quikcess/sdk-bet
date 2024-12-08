import { bettingApi } from "./index.test";

// console.time("bet");
// bettingApi.bets.getAll("0").then(console.log);
// console.timeEnd("bet");

bettingApi.bets.getById("123").then(console.log);
