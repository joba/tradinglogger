"use client";

import { StateSell, updateTradeLog } from "@/app/lib/actions";
import { TradeLog } from "@/app/lib/definitions";
import { useActionState } from "react";
import { lusitana } from "../fonts";
import { Button } from "../button";

export default function UpdateForm({ trade }: { trade: TradeLog }) {
  const initialState: StateSell = { message: null, errors: {} };
  const updateTradeLogWithId = updateTradeLog.bind(null, trade.id);
  const [state, formAction, loading] = useActionState(
    updateTradeLogWithId,
    initialState
  );

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <label className="flex flex-row justify-between items-center">
          <span
            className={`${lusitana.className} text-sm font-medium md:text-base`}
          >
            Exit
          </span>
          <input
            type="number"
            className={`${lusitana.className} border border-gray-300 rounded w-20 text-right`}
            name="sell"
            id="sell"
            step="0.01"
          />
        </label>
        <textarea
          name="comment"
          className={`${lusitana.className} border border-gray-300 rounded px-3 py-2`}
          placeholder="Add a comment (max 255 characters)"
          maxLength={255}
          defaultValue={trade.comment || ""}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </div>
      <div id="sell-error" aria-live="polite" className="text-red-600">
        {state.errors?.sell && <span>{state.errors.sell?.join(", ")}</span>}
      </div>
    </form>
  );
}
