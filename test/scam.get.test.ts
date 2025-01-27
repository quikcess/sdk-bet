import { bettingApi } from "./index.test";

// bettingApi.scam.getAll().then((data) => {
// 	console.log(data);
// });

bettingApi.scam.getSimilar("123").then((data) => {
	console.log(data);
});
