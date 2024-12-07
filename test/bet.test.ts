import { bettingApi } from "./index.test";

console.time("bet");
bettingApi.bets.get("0", 1, 12).then(console.log);
console.timeEnd("bet");
