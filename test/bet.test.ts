import { bettingApi } from "./index.test";

console.time("bet");
bettingApi.bets.getAll("0").then(console.log);
console.timeEnd("bet");