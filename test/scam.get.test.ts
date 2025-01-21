import { bettingApi } from "./index.test.js";

// bettingApi.scam.getAll().then((data) => {
// 	console.log(data);
// });

bettingApi.scam.getSimilar("endrey").then((data) => {
	console.log(data);
});
