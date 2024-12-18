import { BetEntity, Betting } from "../src";

const API_KEY = process.env.API_KEY as string;
export const bettingApi = new Betting(API_KEY);

bettingApi.on("betCreate", async (data) => {
	const bet = new BetEntity(data);
	console.log(`Veja Mais: ${bet.channelId}`, bet);
});

bettingApi.on("betUpdate", async (data) => {
	console.log(data);
	const bet = data ? new BetEntity(data) : undefined;
	console.log(`Veja Mais: ${bet?.channelId}`, bet);
});

bettingApi.on("betDelete", async (data) => {
	console.log(data);
});
