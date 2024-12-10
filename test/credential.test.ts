import { bettingApi } from "./index.test";

console.time("credentials");
bettingApi.credentials
	.create("0", "eydrenn@gmail.com", "bronze")
	.then(console.log);
console.timeEnd("credentials");

/**
 *
 * ADMIN
 * endreyestudos67@gmail.com
 *
 * BRONZE
 * eydrenn@gmail.com
 *
 */
