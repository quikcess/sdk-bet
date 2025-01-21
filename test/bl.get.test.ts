import { bettingApi } from "./index.test.js";

bettingApi.blacklist.getAll().then((data) => {
	console.log(data);
});
