import { bettingApi } from "./index.test.js";

console.time("status");
bettingApi.status().then(console.log);
console.timeEnd("status");
