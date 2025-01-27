import { Betting, GuildBet } from "../src/index";

const API_KEY = process.env.API_KEY as string;
export const client = new Betting(API_KEY);

client.on("betCreate", async (data) => {
	const bet = new GuildBet(data);
	console.log(`Veja Mais: ${bet.channelId}`, bet);
});

client.on("betUpdate", async (data) => {
	console.log(data);
	const bet = data ? new GuildBet(data) : undefined;
	console.log(`Veja Mais: ${bet?.channelId}`, bet);
});

client.on("betDelete", async (data) => {
	console.log(data);
});
