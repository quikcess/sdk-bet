import { bettingApi } from "./index.test";

bettingApi.scam.delete("Piqué Jr PereIra").then((data) => {
	console.log(data);
});

// bettingApi.scam
// 	.update("Piqué Jr PereIra", {
// 		targetName: "Piqué Jr PereIra",
// 	})
// 	.then((data) => {
// 		console.log(data);
// 	});
