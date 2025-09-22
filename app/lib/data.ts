import postgres from "postgres";
import { TradeLog } from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const ITEMS_PER_PAGE = 10;
export async function fetchTradeLogs(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const data = await sql<
      TradeLog[]
    >`SELECT * FROM trades WHERE SELL IS NOT NULL AND asset ILIKE ${`%${query}%`} ORDER BY date DESC LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
    return data;
  } catch (error) {
    console.error("Error fetching trade logs:", error);
    throw new Error("Failed to fetch trade logs.");
  }
}

export async function fetchActiveTrades() {
  try {
    const data = await sql<
      TradeLog[]
    >`SELECT * FROM trades WHERE sell IS NULL ORDER BY date DESC`;
    return data;
  } catch (error) {
    console.error("Error fetching active trades:", error);
    throw new Error("Failed to fetch active trades.");
  }
}
