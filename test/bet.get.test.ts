import { bettingApi } from "./index.test";

async function test() {
	console.time("get-bet");
	const data = await bettingApi.bets.getStats("123");
	console.log(data);
	console.timeEnd("get-bet");
}

test();
