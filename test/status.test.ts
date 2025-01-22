import { bettingApi } from "./index.test";

console.time("status");
bettingApi.status().then(console.log);
console.timeEnd("status");
