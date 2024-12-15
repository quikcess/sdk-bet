import { BetEntity } from "../src/structures/bet/index";
import { bettingApi } from "./index.test";

bettingApi.credentials.get().then((credential) => {
	console.time("bet-get-all");
	console.log(`Credential guildId: ${credential.guildId}`);
	bettingApi.bets
		.getAll(credential.guildId, {
			page: 2,
			limit: 1,
		})
		.then(console.log);

	bettingApi.bets.getAll(credential.guildId).then(console.log);
	console.timeEnd("bet-get-all");
});

bettingApi.on("betCreate", async (data) => {
	const bet = new BetEntity(data);
	console.log(`Veja Mais: ${bet.channelId}`, bet);
});

bettingApi.on("betUpdate", async (data) => {
	const bet = data ? new BetEntity(data) : undefined;
	console.log(`Veja Mais: ${bet?.channelId}`, bet);
});
