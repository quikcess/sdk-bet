import { assertString } from "./assertions/literal";
import { type ClientEvents, TypedEventEmitter } from "./types";
import { APIService } from "./services";
import { Routes } from "./lib/routes";
import { Status } from "./structures";
import { GlobalCacheService } from "./services/cache/global";
import { CredentialModule } from "./modules/credentials";

export class Betting extends TypedEventEmitter<ClientEvents> {
  public static apiInfo = {
    baseUrl: "http://localhost:80",
    version: "v1",
  };

  /** The API service */
  public readonly api: APIService;
  /** The credentials module */
  public readonly credentials = new CredentialModule(this);
  /** The global cache service */
  public readonly cache = new GlobalCacheService();

  constructor(apiKey: string) {
    super();

    assertString(apiKey, "API_KEY");
    this.api = new APIService(apiKey);
  }

  async status(): Promise<Status> {
    const { response } = await this.api.request(Routes.status());
    return new Status(response);
  }
}

export * from "./structures";
export * from "./types";
