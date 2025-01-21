import { ScamStatus, ScamType } from "@quikcess/bet-api-types/v1";
import { bettingApi } from "./index.test.js";

bettingApi.scam
	.add({
		guildId: "123",
		targetName: "cleber",
		type: ScamType.Refund,
		status: ScamStatus.Pending,
		details: "Andou realizando reembolsos.",
		reportedBy: "123",
		evidences: [],
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	})
	.then((data) => {
		console.log(data);
	});
