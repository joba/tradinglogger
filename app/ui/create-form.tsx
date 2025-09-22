"use client";

import { useActionState } from "react";
import { createTradeLog, State } from "../lib/actions";
import { TradeName } from "../lib/definitions";

export default function CreateForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction, loading] = useActionState(
    createTradeLog,
    initialState
  );

  const assetsOptions = Object.values(TradeName).map((asset) => (
    <option key={asset} value={asset}>
      {asset}
    </option>
  ));
  return (
    <form
      action={formAction}
      className="flex h-full flex-col px-3 py-4 md:px-2 gap-2"
    >
      <label className="flex flex-col">
        <select
          className="border border-gray-300 rounded px-3 py-2"
          name="asset"
          id="asset"
        >
          <option value="">Asset</option>
          {assetsOptions}
        </select>
      </label>
      <div id="asset-error" aria-live="polite" className="text-red-600">
        {state.errors?.asset && <span>{state.errors.asset?.join(", ")}</span>}
      </div>
      <label className="flex flex-col">
        <span className="mb-1">Entry</span>
        <input
          type="number"
          name="buy"
          id="buy"
          step="any"
          className="border border-gray-300 rounded px-3 py-2"
          placeholder="Enter entry price"
        />
      </label>
      <div id="buy-error" aria-live="polite" className="text-red-600">
        {state.errors?.buy && <span>{state.errors.buy?.join(", ")}</span>}
      </div>
      <label className="flex flex-col">
        <span className="mb-1">Comment (optional)</span>
        <textarea
          name="comment"
          className="border border-gray-300 rounded px-3 py-2"
          placeholder="Add a comment (max 255 characters)"
          maxLength={255}
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
      >
        Create Trade Log
      </button>
    </form>
  );
}
