import { ScamStatus, ScamType } from "@quikcess/bet-api-types/v1";
import { client } from "./index.test";

client.scam
	.add({
		guildId: "123",
		targetName: "Piqué Jr PereIra",
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
