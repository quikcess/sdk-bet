import { bettingApi } from "./index.test";

const betId = "1737903158915";

console.time("delete-bet");
bettingApi.bets
	.delete("123", betId)
	.then((result) => {
		console.log(result);
		console.timeEnd("delete-bet");
	})
	.catch((error) => {
		console.error(error);
		console.timeEnd("delete-bet");
	});
