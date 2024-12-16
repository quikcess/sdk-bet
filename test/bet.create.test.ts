import { bettingApi } from "./index.test";

const betId = Date.now().toString();
console.time("create-bet");
bettingApi.bets
	.create({
		betId,
		channelId: "123",
		guildId: "123", // Err
		platform: "mobile",
		format: "Normal",
		mode: "1v1",
		players: [{
      userId: "1",
      wins: 0,
      loses: 0,
      consecutives: 0,
      details: {
        gelType: "normal",
        emulators: 0,
      }
    }],
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
			created_url: "",
			started_url: "",
			victory_url: "",
			closed_url: "",
		},
	})
	.then(console.log);
console.timeEnd("create-bet");
