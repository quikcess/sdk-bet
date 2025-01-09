import { bettingApi } from "./index.test";

const data = bettingApi.bets
	.getChannelIdByPlayerIds(["1", "2"])
	.then(console.log);
