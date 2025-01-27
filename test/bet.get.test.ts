import { client } from "./index.test";

async function test() {
	console.time("get-bet");
	const data = await client.bets.getStats("123");
	console.log(data);
	console.timeEnd("get-bet");
}

test();
