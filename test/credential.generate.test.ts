import { client } from "./index.test";

console.time("credentials");
client.credentials.generate("123", "123456", 2).then(console.log);
console.timeEnd("credentials");
