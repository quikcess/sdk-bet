import { bettingApi } from "./index.test";

bettingApi.blacklist.delete("3").then((data) => {
  console.log(data);
});
