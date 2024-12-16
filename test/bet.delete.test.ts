import { bettingApi } from "./index.test";

const betId = "1734381155714";

console.time("delete-bet");
bettingApi.bets
	.delete(betId)
	.then(console.log);
console.timeEnd("delete-bet");
