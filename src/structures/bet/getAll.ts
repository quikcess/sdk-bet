import { Collection } from "@/structures/collection";
import type { BetEntity } from "./base";

/**
 * Represents the result of all bets, including pagination and a collection of bet data.
 */
export class AllBetsEntity {
  /** The current page number of the paginated results, or null if not applicable. */
  currentPage: number | null;

  /** The total number of pages in the result set, or null if not applicable. */
  totalPages: number | null;

  /** The total number of bets in the result set. */
  totalBets: number;

  /** A collection of bets, mapped by their string identifier. */
  data: Collection<string, BetEntity>;

  /**
   * Initializes the AllBetsEntity object.
   *
   * @param currentPage - The current page number of the paginated results.
   * @param totalPages - The total number of pages in the result set.
   * @param totalBets - The total number of bets in the result set.
   * @param data - A collection of bets (default is an empty collection).
   */
  constructor({
    currentPage = null,
    totalPages = null,
    totalBets = 0,
    data = new Collection<string, BetEntity>(),
  }: Partial<AllBetsEntity>) {
    this.currentPage = currentPage;
    this.totalPages = totalPages;
    this.totalBets = totalBets;
    this.data = data;
  }

  /**
   * Serializes the AllBetsEntity object into a plain JSON object.
   *
   * @returns A plain object representation of the AllBetsEntity.
   */
  toJSON() {
    return {
      currentPage: this.currentPage,
      totalPages: this.totalPages,
      totalBets: this.totalBets,
      // Converts the Collection to an array of entries for serialization
      data: Array.from(this.data.entries()),
    };
  }

  /**
   * Returns a string representation of the AllBetsEntity for debugging purposes.
   *
   * @returns A string representation of the AllBetsEntity.
   */
  toString() {
    return `AllBetsEntity {
      currentPage: ${this.currentPage},
      totalPages: ${this.totalPages},
      totalBets: ${this.totalBets},
      data: Collection(${this.data.size}),
    }`;
  }
}
