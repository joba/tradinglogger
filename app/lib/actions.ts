"use server";

import { revalidatePath } from "next/cache";
import postgres from "postgres";
import { z } from "zod";
import { TradeName, TradeType } from "./definitions";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export type State = {
  errors?: {
    asset?: string[];
    buy?: string[];
    comment?: string[];
    type?: string[];
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

const sql = postgres(process.env.TRADELOGS_POSTGRES_URL!, { ssl: "require" });

const FormSchema = z.object({
  id: z.string(),
  asset: z.enum(TradeName, {
    message: "Select a valid asset",
  }),
  type: z.enum(TradeType, {
    message: "Select a valid trade type",
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
    type: formData.get("type"),
    buy: formData.get("buy"),
    comment: formData.get("comment") ?? "",
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors below.",
    };
  }

  const { asset, buy, comment, type } = validatedFields.data;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
      INSERT INTO trades (asset, buy, date, comment, type)
      VALUES (${asset}, ${buy}, ${date}, ${comment}, ${type})
    `;

    revalidatePath("/dashboard", "layout");
    return { message: "Trade log created successfully!", errors: {} };
  } catch (error) {
    return {
      message: "Failed to create trade log.",
      errors: {
        buy: ["An unexpected error occurred. Please try again later."],
      },
    };
  }
}

const UpdateTradeLog = FormSchema.omit({
  id: true,
  asset: true,
  type: true,
  date: true,
  buy: true,
});
export async function updateTradeLog(
  id: number,
  prevState: State,
  formData: FormData
) {
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

  try {
    await sql`
      UPDATE trades
      SET sell = ${sell}, comment = ${comment}
      WHERE id = ${id}
    `;

    revalidatePath("/dashboard", "layout");
    return { message: "Trade log updated successfully!", errors: {} };
  } catch (error) {
    return {
      message: "Failed to update trade log.",
      errors: {
        sell: ["An unexpected error occurred. Please try again later."],
      },
    };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials. Please try again.";
        default:
          return "An unexpected error occurred. Please try again later.";
      }
    }
    throw error;
  }
}
