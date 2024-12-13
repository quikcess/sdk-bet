import { bettingApi } from "./index.test";

console.time("bet-get-all");
bettingApi.bets.getAll().then(console.log);
console.timeEnd("bet-get-all");

bettingApi.on("betCreate", async (data) => {
	console.log(`Veja Mais: ${data.bet_id}`, data);
});
