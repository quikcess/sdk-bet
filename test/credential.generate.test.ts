import { bettingApi } from "./index.test";

console.time("credentials");
bettingApi.credentials.generate("123456", "wagner", 3).then(console.log);
console.timeEnd("credentials");
