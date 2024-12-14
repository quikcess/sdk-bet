import { bettingApi } from "./index.test";

bettingApi.credentials.get().then((credential) => {
  console.time("bet-get-all");
  bettingApi.bets.getAll(credential.guildId).then(console.log);
  console.timeEnd("bet-get-all");
});

bettingApi.on("betCreate", async (data) => {
	console.log(`Veja Mais: ${data.bet_id}`, data);
});
