import { bettingApi } from "./index.test";

const betId = "1734381155714";

console.time("update-bet");
bettingApi.bets
	.update(betId, {
		channelId: "124",
	})
	.then(console.log);
console.timeEnd("update-bet");
