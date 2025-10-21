import React, { useState, useEffect } from "react";
import ReactFlagsSelect from "react-flags-select";

export default function Converter() {
  const [fromCurrency, setFromCurrency] = useState("US");
  const [toCurrency, setToCurrency] = useState("ET");
  const [amount, setAmount] = useState(1);
  const [converted, setConverted] = useState(0);
  const [rate, setRate] = useState(null);

  // Map country codes to currency codes
  const countryToCurrency = {
    US: "USD",
    ET: "ETB",
    GB: "GBP",
    EU: "EUR",
    JP: "JPY",
    CA: "CAD",
    CN: "CNY",
    IN: "INR",
    KE: "KES",
  };

  // Fetch the latest exchange rate whenever currency changes
  useEffect(() => {
    const base = countryToCurrency[fromCurrency];
    const target = countryToCurrency[toCurrency];

    if (base && target) {
      fetch(
        `https://api.exchangerate.host/latest?base=${base}&symbols=${target}`
      )
        .then((res) => res.json())
        .then((data) => {
          const newRate = data?.rates?.[target];
          if (newRate) {
            setRate(newRate);
            setConverted((amount * newRate).toFixed(2));
          }
        })
        .catch((err) => console.error("Error fetching exchange rate:", err));
    }
  }, [fromCurrency, toCurrency]);

  // Update the converted value immediately when typing
  useEffect(() => {
    if (rate && !isNaN(amount)) {
      setConverted((amount * rate).toFixed(2));
    }
  }, [amount, rate]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="flex flex-col justify-between bg-white w-full max-w-md md:max-w-2xl lg:max-w-3xl rounded-2xl shadow-lg overflow-hidden mx-auto h-[90vh] md:h-auto">
      {/* Header */}
      <div className="bg-indigo-500 text-white text-center py-6 rounded-b-3xl">
        <h2 className="text-2xl font-semibold tracking-wide">
          Currency Converter
        </h2>
        <p className="text-sm opacity-80 pt-2">Real-time exchange rates</p>
      </div>

      {/* Body */}
      <div className="p-6 md:p-8 lg:p-10 space-y-6 flex-grow">
        {/* From Section */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
          <label className="text-sm text-gray-500 w-32 md:w-auto">
            Amount from
          </label>
          <div className="flex flex-1 items-center bg-gray-100 rounded-xl p-3 mt-2 md:mt-0">
            <ReactFlagsSelect
              countries={Object.keys(countryToCurrency)}
              selected={fromCurrency}
              onSelect={(code) => setFromCurrency(code)}
              showSelectedLabel={true}
              customLabels={Object.fromEntries(
                Object.entries(countryToCurrency).map(([country, currency]) => [
                  country,
                  { primary: currency },
                ])
              )}
              className="flag-select"
            />
            <input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="ml-auto w-32 text-right bg-transparent outline-none font-semibold text-gray-600"
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center py-4">
          <button
            onClick={handleSwap}
            className="bg-indigo-500 text-white rounded-full p-4 shadow-md hover:bg-indigo-600 transition transform hover:scale-105"
            aria-label="Swap currencies"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 25"
              className="w-10 h-10 md:w-12 md:h-12 text-white"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.793 3.007a1 1 0 0 1 1.414 0l3.5 3.5a1 1 0 0 1-1.414 1.415L8.5 6.129v9.585a1 1 0 1 1-2 0V6.13L4.707 7.922a1 1 0 1 1-1.414-1.415zM16.5 8.714a1 1 0 0 1 1 1V19.3l1.793-1.793a1 1 0 0 1 1.414 1.415l-3.5 3.5a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 0 1 1.414-1.415L15.5 19.3V9.714a1 1 0 0 1 1-1"
              />
            </svg>
          </button>
        </div>

        {/* To Section */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
          <label className="text-sm text-gray-500 w-32 md:w-auto">
            Convert to
          </label>
          <div className="flex flex-1 items-center bg-gray-100 rounded-xl p-3 mt-2 md:mt-0">
            <ReactFlagsSelect
              countries={Object.keys(countryToCurrency)}
              selected={toCurrency}
              onSelect={(code) => setToCurrency(code)}
              showSelectedLabel={true}
              customLabels={Object.fromEntries(
                Object.entries(countryToCurrency).map(([country, currency]) => [
                  country,
                  { primary: currency },
                ])
              )}
              className="flag-select"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 text-center py-6">
        <p className="text-lg font-semibold text-gray-700">
          {amount || 0} {countryToCurrency[fromCurrency]} ={" "}
          <span className="text-indigo-600">
            {converted || 0} {countryToCurrency[toCurrency]}
          </span>
        </p>

        {rate && (
          <p className="text-sm text-gray-500 mt-1">
            1 {countryToCurrency[fromCurrency]} = {rate.toFixed(3)}{" "}
            {countryToCurrency[toCurrency]}
          </p>
        )}
      </div>
    </div>
  );
}
