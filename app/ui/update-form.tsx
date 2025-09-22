"use client";

import { useActionState } from "react";
import { StateSell, updateTradeLog } from "../lib/actions";

export default function UpdateForm({ tradeId }: { tradeId: number }) {
  const initialState: StateSell = { message: null, errors: {} };
  const updateTradeLogWithId = updateTradeLog.bind(null, tradeId);
  const [state, formAction, loading] = useActionState(
    updateTradeLogWithId,
    initialState
  );

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <div className="flex flex-row gap-1">
        <input
          type="number"
          className="border border-gray-300 rounded px-3 py-2"
          name="sell"
          id="sell"
          step="any"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-600 px-3 py-1 text-sm text-white disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
      <div id="sell-error" aria-live="polite" className="text-red-600">
        {state.errors?.sell && <span>{state.errors.sell?.join(", ")}</span>}
      </div>
    </form>
  );
}
