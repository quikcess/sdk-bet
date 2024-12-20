import { BlacklistStatus, BlacklistTargetType } from "@quikcess/bet-api-types/v1";
import { bettingApi } from "./index.test";

bettingApi.blacklist.add({
  guildId: "123",
  targetId: "4",
  targetType: BlacklistTargetType.Discord,
  status: BlacklistStatus.Pending,
  addedBy: "123",
  reason: "porque sim!",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}).then((data) => {
  console.log(data);
});
