import { bettingApi } from "./index.test";

bettingApi.bets.getById("1327042047416336595").then((data) => {
	const dataJson = data.toJSON();
	console.log(dataJson);
});
