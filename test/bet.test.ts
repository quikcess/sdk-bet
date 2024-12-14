import { bettingApi } from "./index.test";
import { BetEntity } from "../src/structures/bet/index"

bettingApi.credentials.get().then((credential) => {
	console.time("bet-get-all");
  console.log(`Credential guildId: ${credential.guildId}`)
	bettingApi.bets.getAll(credential.guildId, {
    page: 2,
    limit: 1
  }).then(console.log);

  bettingApi.bets.getAll(credential.guildId).then(console.log);
	console.timeEnd("bet-get-all");
});

bettingApi.on("betCreate", async (data) => {
  const bet = new BetEntity(data);
	console.log(`Veja Mais: ${bet.channelId}`, data);
});
