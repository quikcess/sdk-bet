import { bettingApi } from "./index.test";

const betId = "1737575262259";

console.time("update-bet");
bettingApi.bets
	.update(betId, {
		channelId: "124",
	})
	.then(console.log);
console.timeEnd("update-bet");
