import { bettingApi } from "./index.test";

const betId = "1";

async function test() {
	const data = await bettingApi.bets.getById(betId);
	console.log(data);
}

test();
