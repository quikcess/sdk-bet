import { bettingApi } from "./index.test";

async function test() {
	console.time("get-bet");
	const data = await bettingApi.bets.getById("1737574691848");
	console.log(data);
	console.timeEnd("get-bet");
}

test();
