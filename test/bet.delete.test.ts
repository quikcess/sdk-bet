import { bettingApi } from "./index.test";

const betId = "1737618683929";

console.time("delete-bet");
bettingApi.bets
	.delete(betId)
	.then((result) => {
		console.log(result);
		console.timeEnd("delete-bet");
	})
	.catch((error) => {
		console.error(error);
		console.timeEnd("delete-bet");
	});
