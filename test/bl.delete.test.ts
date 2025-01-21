import { bettingApi } from "./index.test.js";

bettingApi.blacklist.delete("3").then((data) => {
	console.log(data);
});
