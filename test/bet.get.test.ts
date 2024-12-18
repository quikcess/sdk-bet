import { bettingApi } from "./index.test";

const betId = "1734446380446";

async function test() {
	const data = await bettingApi.bets.getById(betId);
	console.log(data);
}

test();
