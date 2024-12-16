import { bettingApi } from "./index.test";

const betId = "1734381155714";

bettingApi.bets.getById(betId).then(console.log);