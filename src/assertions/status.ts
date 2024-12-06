import { APIStatus } from "@quikcess/bet-api-types/v1";
import * as z from "zod";

import { assertAPIObject } from "./common";

const StatusSchema = z.object({
  status: z.nativeEnum(APIStatus),
  ping: z.string(),
  services: z.object({
    database: z.string(),
    cache: z.string(),
  }),
  uptime: z.number().nullish(),
});

export function assertStatus(value: unknown): asserts value is z.infer<typeof StatusSchema> {
  assertAPIObject({
    schema: StatusSchema,
    value,
    code: "STATUS",
    route: "/status",
  });
}
