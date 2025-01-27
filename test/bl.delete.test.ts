import { client } from "./index.test";

client.blacklist.delete("3").then((data) => {
	console.log(data);
});
