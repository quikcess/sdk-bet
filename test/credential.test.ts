import { client } from "./index.test";

console.time("get-credential");
client.credentials.get().then(console.log);
console.timeEnd("get-credential");
