import { bettingApi } from "./index.test";

// console.time("bet");
// bettingApi.bets.getAll("0").then(console.log);
// console.timeEnd("bet");

// bettingApi.bets.getById("123").then(console.log);
// bettingApi.bets.getByChannelId("123456789").then(console.log);

bettingApi.on("betCreate", async (data) => {
	console.log(`Veja Mais: ${data.betId}`, data);
});

// bettingApi.bets
// 	.create({
// 		betId: "09812121",
// 		channelId: "123",
// 		guildId: "0", // Err
// 		platform: "mobile",
// 		format: "Normal",
// 		mode: "1v1",
// 		players: [],
// 		status: "pending",
// 		type: "regenerative",
// 		roomId: 0,
// 		value: 3,
// 		queueChannelId: "123",
// 		mediatorId: "123",
// 		wo: false,
// 		revenge: false,
// 		emulators: 0,
// 		gelType: "normal",
// 		createdAt: new Date().toISOString(),
// 		updatedAt: new Date().toISOString(),
// 		startedAt: new Date().toISOString(),
// 		closedAt: null,
// 		logs: {
// 			createdUrl: "",
// 			startedUrl: "",
// 			victoryUrl: "",
// 			closedUrl: "",
// 		},
// 	})
// 	.then(() => console.log("success"));

bettingApi.bets.getById("098").then(console.log);
