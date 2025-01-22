import { bettingApi } from "./index.test";

bettingApi.blacklist.getAll().then((data) => {
	console.log(data);
});
