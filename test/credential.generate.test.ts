import { bettingApi } from "./index.test";

console.time("credentials");
bettingApi.credentials.generate("123", "123456", 2).then(console.log);
console.timeEnd("credentials");
