import { bettingApi } from "./index.test";

const betId = "1734193379809";

console.time("update-bet");
bettingApi.bets
	.update(betId, {
    channel_id: "124",
  })
	.then(console.log);
console.timeEnd("update-bet");
