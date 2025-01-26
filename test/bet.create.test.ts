import { bettingApi } from "./index.test";

async function test() {
	const betId = Date.now().toString();

	console.time("create-bet");
	const data = await bettingApi.bets.create({
		betId,
		channelId: betId,
		guildId: "123",
		platform: 1,
		format: "Normal",
		mode: "1x1",
		players: [
			{
				userId: "123456789098765432",
				wins: 0,
				loses: 0,
				consecutives: 0,
			},
			{
				userId: "0987654321123456781",
				wins: 0,
				loses: 0,
				consecutives: 0,
			},
		],
		status: 1,
		type: 1,
		roomId: 0,
		value: "20/10",
		queueChannelId: "123",
		mediatorId: "123",
		wo: false,
		revenge: false,
		emulators: 0,
		gelType: 1,
		gelCount: 1,
		startedAt: new Date().toISOString(),
		closedAt: null,
		logs: {
			createdUrl: null,
			startedUrl: null,
			victoryUrl: null,
			closedUrl: null,
		},
		roomPrice: 1.8,
	});

	console.log(data);
	console.timeEnd("create-bet");
}

test();
