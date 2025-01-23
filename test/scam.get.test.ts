import { bettingApi } from "./index.test";

// bettingApi.scam.getAll().then((data) => {
// 	console.log(data);
// });

bettingApi.scam.getSimilar("pique").then((data) => {
	console.log(data);
});
