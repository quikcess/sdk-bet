import EventEmitter from "events";
import type { APIBetResult } from "@quikcess/bet-api-types/v1";

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

export interface APIEvents {
	betCreate: [data: APIBetResult];
	betUpdate: [before: APIBetResult | undefined, after: APIBetResult];
	betDelete: [betId: string, data: APIBetResult | undefined];
}
