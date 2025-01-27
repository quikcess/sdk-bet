import { client } from "./index.test";

client.blacklist.getAll().then((data) => {
	console.log(data);
});
