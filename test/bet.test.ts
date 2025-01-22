import { bettingApi } from "./index.test";

bettingApi.bets.getById("1734392680743").then((data) => {
	console.log(data);
	console.log(data.toJSON());
});
