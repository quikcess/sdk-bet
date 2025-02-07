import type { z } from "zod";
import { createAssertion } from "../common.js";
import { PartialQueueSchema, QueueSchema } from "./queue.js";

// Assertions for guild queues
export const assertGuildQueue: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof QueueSchema> = createAssertion(
	QueueSchema,
	"QUEUE",
	"/guilds/queues/?",
);

export const assertGuildQueues: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof QueueSchema>[] = createAssertion(
	QueueSchema.array(),
	"QUEUES",
	"/guilds/queues/?",
);

export const assertPartialGuildQueue: (
	value: unknown,
	route?: string,
) => asserts value is z.infer<typeof PartialQueueSchema> = createAssertion(
	PartialQueueSchema,
	"QUEUE",
	"/guilds/queues/?",
);
