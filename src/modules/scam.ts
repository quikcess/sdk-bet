import { assertString } from "@/assertions/literal";
import { Routes } from "@/lib/routes";
import { Scam } from "@/structures/scam/base";
import type { Betting } from "..";

export class ScamModule {
  constructor(private readonly client: Betting) {}

  async getByName(targetName: string): Promise<Scam> {
    assertString(targetName, "TARGET_NAME");

    const { response } = await this.client.api.request(
      Routes.scam.getByName(targetName),
    );

    return new Scam(response);
  }

}
