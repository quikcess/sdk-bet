import { bettingApi } from "./index.test";

console.time("credentials");
bettingApi.credentials.generate("123456", "wagner", "silver").then(console.log);
console.timeEnd("credentials");
