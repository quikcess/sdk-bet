import { APIServicesType, APIStatusType } from "@quikcess/bet-api-types/v1";
import * as z from "zod";
import { assertAPIObject } from "./common";

const StatusSchema = z.object({
	status: z.nativeEnum(APIStatusType),
	ping: z.number(),
	services: z.object({
		database: z.object({
			status: z.nativeEnum(APIServicesType),
			ping: z.number(),
		}),
		cache: z.object({
			status: z.nativeEnum(APIServicesType),
			ping: z.number(),
		}),
	}),
	uptime: z.number().nullish(),
});

export function assertStatus(
	value: unknown,
): asserts value is z.infer<typeof StatusSchema> {
	assertAPIObject({
		schema: StatusSchema,
		value,
		code: "STATUS",
		route: "/status",
	});
}
