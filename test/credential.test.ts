import { bettingApi } from "./index.test";

console.time("get-credential")
bettingApi.credentials.get().then(console.log)
console.timeEnd("get-credential")