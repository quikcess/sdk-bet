import { bettingApi } from "./index.test";

bettingApi.bets.getById("098").then(console.log);

bettingApi.on("betCreate", async (data) => {
	console.log(`Veja Mais: ${data.betId}`, data);
});

