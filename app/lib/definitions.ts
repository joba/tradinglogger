export enum TradeName {
  GOLD = "GOLD",
  SILVER = "SILVER",
  NASDAQ = "NASDAQ",
  OMX = "OMX",
  DAX = "DAX",
}

export type TradeLog = {
  id: number;
  asset: TradeName;
  buy: number; // in cents
  sell: number | null; // in cents
  comment: string;
  date: string; // ISO date string (YYYY-MM-DD)
};
