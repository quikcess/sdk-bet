import { BetEntity, Betting } from "../src/index";

const API_KEY = process.env.API_KEY as string;
export const client = new Betting(API_KEY);

client.on("betCreate", async (data) => {
	const bet = new BetEntity(data);
	console.log(`Veja Mais: ${bet.channelId}`, bet);
});

client.on("betUpdate", async (data) => {
	console.log(data);
	const bet = data ? new BetEntity(data) : undefined;
	console.log(`Veja Mais: ${bet?.channelId}`, bet);
});

client.on("betDelete", async (data) => {
	console.log(data);
});
