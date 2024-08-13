import React, { useEffect, useState } from "react";
import CurrencyDropdown from "./DropDown";
import { HiArrowsRightLeft } from "react-icons/hi2";

const CurrencyConvertor = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);
  const [favorities, setFavorities] = useState(
    JSON.parse(localStorage.getItem("favorities")) || ["INR", "EUR"]
  );

  // currency=' http://api.frankfurter.app/currencise';
  const fetchCurrencies = async () => {
    try {
      const response = await fetch(" http://api.frankfurter.app/currencies");
      const data = await response.json();
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);
  console.log(currencies);
  

  const handleFavourite = (currency) => {
    if (!favourites.includes(currency)) {
      setFavourites([...favourites, currency]);
    } else {
      setFavourites(favourites.filter((c) => c !== currency));
    }
  };
  const convertCurrency = async () => {
    if (!amount) return;
    setConverting(true);

    try {
      const url = `https://api.frankfurter.app/latest?amount=
				${amount}&from=${fromCurrency}&to=${toCurrency}`;
      const res = await fetch(url);
      const data = await res.json();
      setConvertedAmount(data.rates[toCurrency] + ' ' + toCurrency);
      // console.log(data.rates[toCurrency]);
      console.log(data);
      console.log(url);
    } catch (error) {
      console.log('ERROR', error);
    } finally {
      setConverting(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setConvertedAmount(null);
  };

  console.log("currencies", currencies);
  console.log("favorities", favorities);

  // currency=' http://api.frankfurter.app/latest?amount+1&from=USD&to=INR';

  return (
    <>
      <div className="max-w=xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
        <h1 className="md=5 text-2xl font-semibold text-gray-700">
          Currency Convertor
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <CurrencyDropdown
            favorities={favorities}
            currencies={currencies}
            title="from"
            Currency={fromCurrency}
            setCurrency={setFromCurrency}
            handlefavorite={handlefavorite}
          />
          <div className="flex justify-center items-center mb-0 md:mb-0">
            <button
              onClick={swapCurrencies}
              aria-label="Swap Currencies"
              className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
            >
              <HiArrowsRightLeft className="text-xl text-gray-700" />
            </button>
          </div>

          <CurrencyDropdown
            favorities={favorities}
            currencies={currencies}
            title="To"
            currency={toCurrency}
            setCurrency={setToCurrency}
            handlefavorite={handlefavorite}
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount
          </label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            className="w-full p-2 border-gray-300 rounded-md shadow-5m 
          focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
          ></input>
        </div>
        <div className="flex justify-end mt-6">
          <button
            className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                converting ? "animate-pulse" : ""
              }`}
            onClick={convertCurrency}
          >
            Convert
          </button>
        </div>
        {convertedAmount && (
          <div className="mt-4 text-lg font-medium text-right text-green-600">
            <span className="italic">Converted Amount:</span>
            <span className="font-semibold">
              {" "}
              {convertedAmount}
              {toCurrency}
            </span>
          </div>
        )}
      </div>
    </>
  );
};
export default CurrencyConvertor;
