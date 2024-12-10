import EventEmitter from "events";
import type { Status } from "@/structures";
import type { BetStructure } from "@/structures/bet/base";

export class TypedEventEmitter<TEvents extends Record<string, any>> {
	private emitter = new EventEmitter();

	emit<TEventName extends keyof TEvents & string>(
		eventName: TEventName,
		...eventArg: TEvents[TEventName]
	) {
		this.emitter.emit(eventName, ...(eventArg as []));
	}

	on<TEventName extends keyof TEvents & string>(
		eventName: TEventName,
		handler: (...eventArg: TEvents[TEventName]) => void,
	) {
		this.emitter.on(eventName, handler as any);
	}

	off<TEventName extends keyof TEvents & string>(
		eventName: TEventName,
		handler: (...eventArg: TEvents[TEventName]) => void,
	) {
		this.emitter.off(eventName, handler as any);
	}
}

export interface ClientEvents {
	betCreate: [data: BetStructure];
	statusUpdate: [before: Status | undefined, after: Status];
}

export interface APIEvents {
	betCreate: [data: BetStructure];
	betUpdate: [betId: string, status: string];
	betDelete: [betId: string];
	userConnected: [userId: string];
	userDisconnected: [userId: string];
}
