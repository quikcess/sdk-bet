import { Betting } from "../src";

const API_KEY = process.env.API_KEY as string;
export const bettingApi = new Betting(API_KEY);
