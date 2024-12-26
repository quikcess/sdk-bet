import { bettingApi } from "./index.test";

console.time("credentials");
bettingApi.credentials.generate("0", "123312312231", 0).then(console.log);
console.timeEnd("credentials");
