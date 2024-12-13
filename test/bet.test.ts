import { bettingApi } from "./index.test";

console.time("bet-get");
bettingApi.bets.getById("098").then(console.log);
console.timeEnd("bet-get");


console.time("bet-get-all");
bettingApi.bets.getAll("0").then(console.log);
console.timeEnd("bet-get-all");


bettingApi.on("betCreate", async (data) => {
	console.log(`Veja Mais: ${data.bet_id}`, data);
});
