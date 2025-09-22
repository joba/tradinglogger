"use server";

import { revalidatePath } from "next/cache";
import postgres from "postgres";
import { z } from "zod";
import { TradeName } from "./definitions";

export type State = {
  errors?: {
    asset?: string[];
    buy?: string[];
    comment?: string[];
  };
  message?: string | null;
};

export type StateSell = {
  errors?: {
    sell?: string[];
    comment?: string[];
  };
  message?: string | null;
};

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const FormSchema = z.object({
  id: z.string(),
  asset: z.enum(TradeName, {
    message: "Select a valid asset",
  }),
  buy: z.coerce.number().min(0, "Buy price must be greater than 0"),
  sell: z.coerce.number().min(0, "Sell price must be greater than 0"),
  comment: z.string().max(255),
  date: z.string(),
});

const CreateTradeLog = FormSchema.omit({ id: true, date: true, sell: true });

export async function createTradeLog(prevState: State, formData: FormData) {
  const validatedFields = CreateTradeLog.safeParse({
    asset: formData.get("asset"),
    buy: formData.get("buy"),
    comment: formData.get("comment") ?? "",
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors below.",
    };
  }

  const { asset, buy, comment } = validatedFields.data;
  const buyInCents = Math.round(buy * 100);
  const date = new Date().toISOString().split("T")[0];
  console.log(asset, buyInCents, date, comment);

  try {
    await sql`
      INSERT INTO trades (asset, buy, date, comment)
      VALUES (${asset}, ${buyInCents}, ${date}, ${comment})
    `;

    revalidatePath("/");
    return { message: "Trade log created successfully!", errors: {} };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to create trade log.");
  }
}

const UpdateTradeLog = FormSchema.omit({
  id: true,
  asset: true,
  date: true,
  buy: true,
});
export async function updateTradeLog(
  id: number,
  prevState: State,
  formData: FormData
) {
  console.log("POST");
  const validatedFields = UpdateTradeLog.safeParse({
    sell: formData.get("sell"),
    comment: formData.get("comment") ?? "",
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors below.",
    };
  }

  const { sell, comment } = validatedFields.data;
  const sellInCents = Math.round(sell * 100);

  console.log(sellInCents, comment);
  try {
    await sql`
      UPDATE trades
      SET sell = ${sellInCents}, comment = ${comment}
      WHERE id = ${id}
    `;

    revalidatePath("/");
    return { message: "Trade log updated successfully!", errors: {} };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to update trade log.");
  }
}
