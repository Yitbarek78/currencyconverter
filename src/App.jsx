// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./stylesheets/App.css";
// import React from "react";
// import "./stylesheets/index.css";
// import Converter from "./components/converter";

// function App() {
//   return (
//     <div>
//       <div className="max-w-4x1 m-auto pb-6 pt-14"></div>
//       <Converter></Converter>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
export default function App() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("ETB");
  const [amount, setAmount] = useState(1);
  const [converted, setConverted] = useState(0);
  const [rate, setRate] = useState(null);
  const currencies = ["USD", "ETB", "EUR", "GBP", "JPY"];
  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetch(
        `https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=${toCurrency}`
      )
        .then((res) => res.json())
        .then((data) => {
          setRate(data.rates[toCurrency]);
          setConverted((amount * data.rates[toCurrency]).toFixed(2));
        });
    }
  }, [fromCurrency, toCurrency, amount]);
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
  return (
    <div className="bg-white w-80 rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-indigo-500 text-white text-center py-6 rounded-b-3xl">
        <h2 className="text-xl ">Currency Converter</h2>
        <p className="text-sm opacity-80 pt-2">Real time exchange rates</p>
      </div>
      <div className="p-5 space-y-4">
        <div>
          <label className="text-sm text-gray-500">Amount from</label>
          <div className="flex items-center bg-gray-100 rounded-xl p-2 mt-1">
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="bg-transparent outline-none font-medium text-gray-600"
            >
              {currencies.map((cur) => (
                <option key={cur}>{cur}</option>
              ))}
            </select>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="ml-auto w-24 text-right bg-transparent outline-none font-semibold text-gray-600"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSwap}
            className="
      bg-indigo-500 
      text-white 
      rounded-full 
      p-3 
      shadow-md 
      hover:bg-indigo-600 
      transition 
      flex 
      flex-col 
      items-center 
      justify-center
    "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 25"
              className="w-12 h-12 md:w-16 md:h-16 text-white"
              fill="currentcolor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.793 3.007a1 1 0 0 1 1.414 0l3.5 3.5a1 1 0 0 1-1.414 1.415L8.5 6.129v9.585a1 1 0 1 1-2 0V6.13L4.707 7.922a1 1 0 1 1-1.414-1.415zM16.5 8.714a1 1 0 0 1 1 1V19.3l1.793-1.793a1 1 0 0 1 1.414 1.415l-3.5 3.5a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 0 1 1.414-1.415L15.5 19.3V9.714a1 1 0 0 1 1-1"
              />
            </svg>
          </button>
        </div>

        <div>
          <label className="text-sm text-gray-500"> Converted Amount </label>
          <div className="flex items-center bg-gray-100 rounded-xl p-2 mt-1 text-gray-600">
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="bg-transparent outline-none font-medium"
            >
              {currencies.map((cur) => (
                <option key={cur}>{cur}</option>
              ))}
            </select>
            <input
              type="text"
              value={converted}
              readOnly
              className="ml-auto w-24 text-right bg-transparent font-semibold text-gray-600"
            />
          </div>
        </div>
        {rate && (
          <p className="text-center text-sm text-gray-500 mt-2">
            1 {fromCurrency} = {rate.toFixed(3)} {toCurrency}
          </p>
        )}
      </div>
    </div>
  );
}
