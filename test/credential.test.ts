import { bettingApi } from "./index.test.js";

console.time("get-credential");
bettingApi.credentials.get().then(console.log);
console.timeEnd("get-credential");
