import { assertString } from "./assertions/literal";
import { type ClientEvents, TypedEventEmitter } from "./types";
import { APIService } from "./services";
import { Routes } from "./lib/routes";
import type { APIStatusInfo } from "@quikcess/bet-api-types/v1";
import { APIServerStatus } from "./structures";

export class Betting extends TypedEventEmitter<ClientEvents> {
  public static apiInfo = {
    baseUrl: "http://localhost:80",
    version: "v1",
  };

  /** The API service */
  public readonly api: APIService;

  constructor(apiKey: string) {
    super();

    assertString(apiKey, "API_KEY");
    this.api = new APIService(apiKey);
  }

  async status(): Promise<APIServerStatus> {
    const { response } = await this.api.request(Routes.status());
    return new APIServerStatus(response);
  }
}

export * from "./structures";
export * from "./types";
