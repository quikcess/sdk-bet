import { bettingApi } from "./index.test";

console.time("bet-get")
bettingApi.bets.getById("098").then(console.log);
console.timeEnd("bet-get")

bettingApi.on("betCreate", async (data) => {
	console.log(`Veja Mais: ${data.betId}`, data);
});

