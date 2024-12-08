import { Collection } from "@/structures/collection";
import type { BetStructure } from "./base";

export class AllBetsResult {
  currentPage: number | null;
  totalPages: number | null;
  totalBets: number;
  data: Collection<string, BetStructure>;

  constructor({
    currentPage = null,
    totalPages = null,
    totalBets = 0,
    data = new Collection<string, BetStructure>(),
  }: Partial<AllBetsResult>) {
    this.currentPage = currentPage;
    this.totalPages = totalPages;
    this.totalBets = totalBets;
    this.data = data;
  }

  toJSON() {
    return {
      currentPage: this.currentPage,
      totalPages: this.totalPages,
      totalBets: this.totalBets,
      data: Array.from(this.data.entries()), // Serialize Collection
    };
  }

  toString() {
    return `AllBetsResult {
      currentPage: ${this.currentPage},
      totalPages: ${this.totalPages},
      totalBets: ${this.totalBets},
      data: Collection(${this.data.size}),
    }`;
  }
}
