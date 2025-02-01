import { client } from "./index.test";

client.guilds.fetch("123").then(async (guild) => {
	// const mediator = await guild.mediators.create({
	// 	guildId: "123",
	// 	userId: "123",
	// 	pix: {
	// 		key: null,
	// 		name: null,
	// 		message: null,
	// 	},
	// 	uptime: 0,
	// 	signature: {
	// 		role_id: null,
	// 		expiration_time: null,
	// 		autorole: false,
	// 	},
	// 	limiter: {
	// 		simultaneous: 0,
	// 		daily: 0,
	// 	},
	// 	stats: {
	// 		total: 0,
	// 		started: 0,
	// 		closed: 0,
	// 		pending: 0,
	// 		in_progress: 0,
	// 		cancelled: 0,
	// 		abandoned: 0,
	// 		played: 0,
	// 		walkover: 0,
	// 		revenged: 0,
	// 		punishments: 0,
	// 		billed: {
	// 			profit: 0,
	// 			fee_only: 0,
	// 			revenue: 0,
	// 			rooms: {
	// 				sold: 0,
	// 				revenue: 0,
	// 				expenses: 0,
	// 				profit: 0,
	// 			},
	// 		},
	// 	},
	// 	categoryId: null,
	// 	virtualAccounts: 0,
	// 	lastEntry: null,
	// });

	const mediator = await guild.mediators.fetch("123");
	console.log(mediator);
});
