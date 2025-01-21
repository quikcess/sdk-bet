import { bettingApi } from "./index.test.js";

console.time("credentials");
bettingApi.credentials.generate("0", "0", 0).then(console.log);
console.timeEnd("credentials");
