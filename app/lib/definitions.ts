export enum TradeName {
  GOLD = "GOLD",
  SILVER = "SILVER",
  NASDAQ = "NASDAQ",
  OMX = "OMX",
  DAX = "DAX",
}

export enum TradeType {
  BULL = "BULL",
  BEAR = "BEAR",
  MINI_S = "MINI_S",
  MINI_L = "MINI_L",
}

export type TradeLog = {
  id: number;
  asset: TradeName;
  buy: number;
  sell: number | null;
  comment: string;
  date: string; // ISO date string (YYYY-MM-DD)
  type: TradeType;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};
