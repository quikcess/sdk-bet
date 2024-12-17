import type { BetEntity } from "../src";
import { bettingApi } from "./index.test";

const betId = "1734446380446";

async function test() {
  const data: BetEntity = await bettingApi.bets.getById(betId);
}

test()