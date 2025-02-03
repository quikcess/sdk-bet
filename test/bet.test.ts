import { client } from "./index.test";

// client.guilds.fetch("123").then(async (guild) => {
// 	// const mediator = await guild.mediators.create({
// 	// 	guildId: "123",
// 	// 	userId: "123",
// 	// 	pix: {
// 	// 		key: null,
// 	// 		name: null,
// 	// 		message: null,
// 	// 	},
// 	// 	uptime: 0,
// 	// 	signature: {
// 	// 		role_id: null,
// 	// 		expiration_time: null,
// 	// 		autorole: false,
// 	// 	},
// 	// 	limiter: {
// 	// 		simultaneous: 0,
// 	// 		daily: 0,
// 	// 	},
// 	// 	stats: {
// 	// 		total: 0,
// 	// 		started: 0,
// 	// 		closed: 0,
// 	// 		pending: 0,
// 	// 		in_progress: 0,
// 	// 		cancelled: 0,
// 	// 		abandoned: 0,
// 	// 		played: 0,
// 	// 		walkover: 0,
// 	// 		revenged: 0,
// 	// 		punishments: 0,
// 	// 		billed: {
// 	// 			profit: 0,
// 	// 			fee_only: 0,
// 	// 			revenue: 0,
// 	// 			rooms: {
// 	// 				sold: 0,
// 	// 				revenue: 0,
// 	// 				expenses: 0,
// 	// 				profit: 0,
// 	// 			},
// 	// 		},
// 	// 	},
// 	// 	categoryId: null,
// 	// 	virtualAccounts: 0,
// 	// 	lastEntry: null,
// 	// });

// 	// const mediator = await guild.mediators.fetch("123");
// 	// console.log(mediator);

// 	const betId = "123";

// 	// const bet = await guild.bets.create({
// 	// 	betId,
// 	// 	channelId: `${betId}2`,
// 	// 	guildId: "123",
// 	// 	platform: 1,
// 	// 	format: "Normal",
// 	// 	mode: "1x1",
// 	// 	players: [
// 	// 		{
// 	// 			userId: "123456789098765432",
// 	// 			winner: null,
// 	// 		},
// 	// 		{
// 	// 			userId: "0987654321123456781",
// 	// 			winner: true,
// 	// 		},
// 	// 	],
// 	// 	status: 1,
// 	// 	type: 1,
// 	// 	roomId: 0,
// 	// 	value: 10,
// 	// 	queueChannelId: "123",
// 	// 	mediatorId: "123",
// 	// 	wo: false,
// 	// 	revenge: false,
// 	// 	emulators: 0,
// 	// 	gelType: 1,
// 	// 	gelCount: 1,
// 	// 	startedAt: new Date().toISOString(),
// 	// 	closedAt: null,
// 	// 	logs: {
// 	// 		createdUrl: null,
// 	// 		startedUrl: null,
// 	// 		victoryUrl: null,
// 	// 		closedUrl: null,
// 	// 	},
// 	// 	roomPrice: 1.8,
// 	// 	playersWhoConfirmed: [],
// 	// 	cancelledBy: null,
// 	// 	abandonedBy: null,
// 	// 	givenUpBy: null,
// 	// });

// 	// console.log(bet);

// 	console.log(await guild.bets.getStats());
// });

client.guilds.get("123").then(async (guild) => {
	console.log(await guild.bets.fetch("1738599807391"));

	console.log(
		guild.bets.cache.find({
			filter: {
				// status: { $nin: [BetStatus.Closed, BetStatus.Revenged] },
				players: {
					$elemMatch: {
						userId: {
							$in: ["123"],
						},
					},
				},
			},
		}),
	);
});
