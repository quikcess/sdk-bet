import { bettingApi } from "./index.test";

async function test() {
	console.time("bet");
	await bettingApi.bets.has("123");
	console.timeEnd("bet");
}

test();
