import postgres from "postgres";

export const sql = postgres(process.env.TRADELOGS_POSTGRES_URL!, {
  ssl: "require",
});
