import { bettingApi } from "./index.test";

// bettingApi.scam.getAll().then((data) => {
// 	console.log(data);
// });

bettingApi.scam.getSimilar("endrey").then((data) => {
	console.log(data);
});
