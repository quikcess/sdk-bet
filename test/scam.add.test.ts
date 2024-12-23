import { BlacklistStatus } from "@quikcess/bet-api-types/v1";
import { bettingApi } from "./index.test";

bettingApi.blacklist
	.update("2", {
		status: BlacklistStatus.Validated,
	})
	.then((data) => {
		console.log(data);
	});
