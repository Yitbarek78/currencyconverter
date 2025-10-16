import React from "react";

import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
function ConverterNames() {
  return (
    <section className="h-screen pt-14 bg-white pb-14 px-6 shadow">
      <h1 className="text-black text-2xl mb-10 font-semibold">
        Currency Converter
      </h1>
      <p>Real time exchange rates</p>
      <form>
        <div className="flex flex-row mb-6 gap-9 items center">
          <div className="flex-1">
            <label className="font-bold text-sm mb-3 block " htmlFor="text">
              Amount from
            </label>
            <input
              type="text"
              className="focus:outline-none focus:ring-1 focus:ring-green-500 
          focus:border-green-500 w-full border-2 rounded-sm min-h-50 pl-3 pr-10 py-2 "
              value="q"
              size="lg"
              placeholder="Enter amount"
            />
          </div>
          <div className="flex-1">
            <label className="font-bold text-sm mb-3 block " htmlFor="text">
              Amount to
            </label>
            <input
              type="text"
              className="focus:outline-none focus:ring-1 focus:ring-green-500 
          focus:border-green-500 w-full border-2 rounded-sm min-h-50 pl-3 pr-10 py-2 "
              value="q"
              size="lg"
              placeholder="Enter amount"
            />
          </div>
          <p className="font-bold text-sm mb-3 block">
            Indicative Exchange Rate
          </p>
          <br />
          <h3 className="flex flex-row mb-6 gap-9 items">
            100 usd = 14,435 sample
          </h3>
        </div>
      </form>
    </section>
  );
}

export default ConverterNames;
