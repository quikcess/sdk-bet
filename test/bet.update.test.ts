import { bettingApi } from "./index.test.js";

const betId = "1734389535673";

console.time("update-bet");
bettingApi.bets
	.update(betId, {
		channelId: "124",
	})
	.then(console.log);
console.timeEnd("update-bet");
