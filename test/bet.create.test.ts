import { bettingApi } from "./index.test";

console.time("create-bet")
bettingApi.bets
	.create({
		betId: "09812121",
		channelId: "123",
		guildId: "0", // Err
		platform: "mobile",
		format: "Normal",
		mode: "1v1",
		players: [],
		status: "pending",
		type: "regenerative",
		roomId: 0,
		value: 3,
		queueChannelId: "123",
		mediatorId: "123",
		wo: false,
		revenge: false,
		emulators: 0,
		gelType: "normal",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		startedAt: new Date().toISOString(),
		closedAt: null,
		logs: {
			createdUrl: "",
			startedUrl: "",
			victoryUrl: "",
			closedUrl: "",
		},
	})
	.then(() => console.log("success"));
console.timeEnd("create-bet")
