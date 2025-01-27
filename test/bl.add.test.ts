import { BlacklistStatus } from "@quikcess/bet-api-types/v1";
import { client } from "./index.test";

client.blacklist
	.update("2", {
		status: BlacklistStatus.Validated,
	})
	.then((data) => {
		console.log(data);
	});
