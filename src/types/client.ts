import EventEmitter from "events";
import type { APIBlacklist, APIGuildBet } from "@quikcess/bet-api-types/v1";

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
	blacklistAdd: [data: APIBlacklist];
	blacklistUpdate: [before: APIBlacklist | undefined, after: APIGuildBet];
	blacklistDelete: [data: APIBlacklist];
	betCreate: [data: APIGuildBet];
	betUpdate: [before: APIGuildBet | undefined, after: APIGuildBet];
	betDelete: [betId: string, data: APIGuildBet | undefined];
}
