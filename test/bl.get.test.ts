import { bettingApi } from "./index.test";

bettingApi.blacklist.has("123").then((data) => {
	console.log(data);
});
