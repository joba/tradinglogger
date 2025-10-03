import postgres from "postgres";
import { TradeLog } from "./definitions";

const sql = postgres(process.env.TRADELOGS_POSTGRES_URL!, { ssl: "require" });

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

export async function fetchCardData() {
  try {
    const tradesCountPromise = sql`SELECT COUNT(*) FROM trades WHERE sell IS NOT NULL`;
    const tradesWinCountPromise = sql`SELECT COUNT(*) FROM trades WHERE sell IS NOT NULL AND buy <= sell`;
    const tradesLossCountPromise = sql`SELECT COUNT(*) FROM trades WHERE sell IS NOT NULL AND buy > sell`;
    const tradeBiggestWinInPercentagePromise = sql`SELECT MAX(((sell - buy) / buy) * 100) AS biggest_win_percentage FROM trades WHERE sell IS NOT NULL AND buy > 0`;
    const tradeBiggestLossInPercentagePromise = sql`SELECT MIN(((sell - buy) / buy) * 100) AS biggest_loss_percentage FROM trades WHERE sell IS NOT NULL AND buy > sell`;

    const data = await Promise.all([
      tradesCountPromise,
      tradesWinCountPromise,
      tradesLossCountPromise,
      tradeBiggestWinInPercentagePromise,
      tradeBiggestLossInPercentagePromise,
    ]);
    const numberOfTrades = Number(data[0][0]?.count ?? 0);
    const numberOfWinningTrades = Number(data[1][0]?.count ?? 0);
    const numberOfLosingTrades = Number(data[2][0]?.count ?? 0);
    const biggestWinInPercentage = `+${Number(
      data[3][0]?.biggest_win_percentage ?? 0
    ).toFixed(2)}%`;
    const biggestLossInPercentage = `${Number(
      data[4][0]?.biggest_loss_percentage ?? 0
    ).toFixed(2)}%`;

    return {
      numberOfTrades,
      numberOfWinningTrades,
      numberOfLosingTrades,
      biggestWinInPercentage,
      biggestLossInPercentage,
    };
  } catch (error) {
    console.error("Error fetching card data:", error);
    throw new Error("Failed to fetch card data.");
  }
}
