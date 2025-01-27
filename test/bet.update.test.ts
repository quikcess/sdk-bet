import { BetStatus } from "@quikcess/bet-api-types/v1";
import { client } from "./index.test";

const betId = "1737919368974";

console.time("update-bet");
client.bets
	.update("123", betId, {
		status: BetStatus.InProgress,
		players: [
			{
				userId: "123456789098765432",
				wins: 0,
				loses: 0,
				consecutives: 0,
			},
			{
				userId: "0987654321123456781",
				wins: 1,
				loses: 0,
				consecutives: 0,
			},
		],
	})
	.then(console.log);
console.timeEnd("update-bet");
