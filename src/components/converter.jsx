import React, { useState, useEffect } from "react";
import ReactFlagsSelect from "react-flags-select";
import "../stylesheets/index.css";
export default function Converter() {
  const [fromCurrency, setFromCurrency] = useState("US");
  const [toCurrency, setToCurrency] = useState("ET");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [amount, setAmount] = useState("");
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const countryToCurrency = {
    US: "USD", // United States
    ET: "ETB", // Ethiopia
    GB: "GBP", // United Kingdom
    EU: "EUR", // European Union
    JP: "JPY", // Japan
    CA: "CAD", // Canada
    CN: "CNY", // China
    IN: "INR", // India
    KE: "KES", // Kenya
    SA: "SAR", // Saudi Arabia
    AE: "AED", // United Arab Emirates (Dubai)
    CH: "CHF", // Switzerland
    SE: "SEK", // Sweden
    NO: "NOK", // Norway
    KR: "KRW", // South Korea
    AU: "AUD", // Australia
    NG: "NGN", // Nigeria
    ZA: "ZAR", // South Africa
    BR: "BRL", // Brazil
    TR: "TRY", // Turkey
    SG: "SGD", // Singapore
    MX: "MXN", // Mexico
    EG: "EGP", // Egypt
    PK: "PKR", // Pakistan
    TH: "THB", // Thailand
    ID: "IDR", // Indonesia
    MY: "MYR", // Malaysia
    PH: "PHP", // Philippines
    AR: "ARS", // Argentina
    NZ: "NZD", // New Zealand
  };

  let toAmount = "";
  let fromAmount = "";

  if (exchangeRate && amount !== "") {
    if (amountInFromCurrency) {
      fromAmount = amount;
      toAmount = (amount * exchangeRate).toFixed(2);
    } else {
      toAmount = amount;
      fromAmount = (amount / exchangeRate).toFixed(2);
    }
  }

  // Fetch exchange rate from a reliable API
  useEffect(() => {
    const fetchRate = async () => {
      const base = countryToCurrency[fromCurrency];
      const target = countryToCurrency[toCurrency];
      if (!base || !target) return;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`https://open.er-api.com/v6/latest/${base}`);
        if (!res.ok) throw new Error(`API returned ${res.status}`);
        const data = await res.json();

        if (!data || !data.rates || !data.rates[target]) {
          console.log("API response:", data);
          throw new Error("Invalid API response structure");
        }

        setExchangeRate(data.rates[target]);
      } catch (err) {
        console.error("Error fetching exchange rate:", err);
        setError(
          "Could not fetch exchange rate. Check your internet or try again later."
        );
        setExchangeRate(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRate();
  }, [fromCurrency, toCurrency]);

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  };

  const handleToAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  };

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
              onSelect={setFromCurrency}
              customLabels={Object.fromEntries(
                Object.entries(countryToCurrency).map(([country, currency]) => [
                  country,
                  { primary: currency },
                ])
              )}
              className="flag-select flag-select__option"
            />
            <input
              type="number"
              placeholder="Enter amount"
              value={fromAmount}
              onChange={handleFromAmountChange}
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
              onSelect={setToCurrency}
              customLabels={Object.fromEntries(
                Object.entries(countryToCurrency).map(([country, currency]) => [
                  country,
                  { primary: currency },
                ])
              )}
              className="flag-select flag-select__option"
            />
            <input
              type="number"
              placeholder="Converted amount"
              value={toAmount}
              onChange={handleToAmountChange}
              className="ml-auto w-32 text-right bg-transparent outline-none font-semibold text-gray-600"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 text-center py-6 min-h-[80px] flex flex-col justify-center items-center">
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 text-sm">Fetching latest rates...</p>
          </div>
        ) : error ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : exchangeRate ? (
          <p className="text-sm text-gray-500">
            1 {countryToCurrency[fromCurrency]} = {exchangeRate.toFixed(3)}{" "}
            {countryToCurrency[toCurrency]}
          </p>
        ) : (
          <p className="text-gray-500 text-sm">
            Select currencies and enter an amount to start
          </p>
        )}
      </div>
    </div>
  );
}
