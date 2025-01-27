import { client } from "./index.test";

const guild = client.guilds.get("123");
const getBet = guild.bets.cache.get("123");
const fetchBet = client.bets.fetch("123");
