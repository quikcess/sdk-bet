import { bettingApi } from "./index.test";

console.time("credentials");
bettingApi.credentials.generate("0", "endrey", "unlimited").then(console.log);
console.timeEnd("credentials");
