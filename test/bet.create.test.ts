import { bettingApi } from "./index.test";

const bet_id = Date.now().toString()
console.time("create-bet");
bettingApi.bets
	.create({
		bet_id,
		channel_id: "123",
		guild_id: "0", // Err
		platform: "mobile",
		format: "Normal",
		mode: "1v1",
		players: [],
		status: "pending",
		type: "regenerative",
		room_id: 0,
		value: 3,
		queue_channel_id: "123",
		mediator_id: "123",
		wo: false,
		revenge: false,
		emulators: 0,
		gel_type: "normal",
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
		started_at: new Date().toISOString(),
		closed_at: null,
		logs: {
			created_url: "",
			started_url: "",
			victory_url: "",
			closed_url: "",
		},
	})
	.then(console.log);
console.timeEnd("create-bet");
