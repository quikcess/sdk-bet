import { client } from "./index.test";

console.time("status");
client.status().then(console.log);
console.timeEnd("status");
