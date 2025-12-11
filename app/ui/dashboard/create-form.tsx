"use client";

import { useActionState, useState } from "react";
import { createTradeLog, State } from "../../lib/actions";
import { lusitana } from "@/app/ui/fonts";
import { TradeName, TradeType } from "../../lib/definitions";
import { Button } from "../button";

export default function CreateForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction, loading] = useActionState(
    createTradeLog,
    initialState
  );
  const [selectedAsset, setSelectedAsset] = useState("");

  const assetsOptions = Object.values(TradeName).map((asset) => (
    <option key={asset} value={asset}>
      {asset}
    </option>
  ));

  const typeOptions = Object.values(TradeType).map((type) => (
    <div key={type}>
      <input type="radio" name="type" value={type} id={`type-${type}`} />{" "}
      <label htmlFor={`type-${type}`} className="text-xs">
        {type}
      </label>
    </div>
  ));

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        New trade
      </h2>
      <div className="h-full rounded-xl bg-gray-50 p-4">
        <form
          action={formAction}
          className="flex h-full flex-col px-3 py-4 gap-2 bg-white"
        >
          <label className="flex flex-col">
            <select
              className="border border-gray-300 rounded px-3 py-2"
              name="asset"
              id="asset"
              value={selectedAsset}
              onChange={(e) => setSelectedAsset(e.target.value)}
            >
              <option value="">Asset</option>
              {assetsOptions}
            </select>
          </label>
          <div id="asset-error" aria-live="polite" className="text-red-600">
            {state.errors?.asset && (
              <span>{state.errors.asset?.join(", ")}</span>
            )}
          </div>
          {selectedAsset && (
            <label className="flex flex-col">
              <div className="flex gap-4">{typeOptions}</div>
            </label>
          )}
          <label className="flex flex-col">
            <span
              className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
            >
              Entry
            </span>
            <input
              type="number"
              name="buy"
              id="buy"
              step="0.001"
              className="border border-gray-300 rounded px-3 py-2"
              placeholder="Enter entry price"
            />
          </label>
          <div id="buy-error" aria-live="polite" className="text-red-600">
            {state.errors?.buy && <span>{state.errors.buy?.join(", ")}</span>}
          </div>
          <label className="flex flex-col">
            <span
              className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
            >
              Comment (optional)
            </span>
            <textarea
              name="comment"
              className="border border-gray-300 rounded px-3 py-2"
              placeholder="Add a comment (max 255 characters)"
              maxLength={255}
            />
          </label>
          <Button type="submit" loading={loading}>
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}
