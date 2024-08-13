import React from "react";
import { HiOutlineStar, HiStar } from "react-icons/hi2";
const CurrencyDropdown = ({
  currencies,
  Currency,
  setCurrency,
  favorities,
  handlefavorite,
  title = "",
  setConvertedAmount,
}) => {
  const isfavorite = (curr) => favorities.includes(curr);
  return (
    <div>
      <label
        htmlFor={title}
        className="block text-5m font-medium text-gray-700"
      >
        {title}
      </label>
      <div className="mt-1 relative">
        <select
          value={Currency}
          onChange={(e) => {
            setCurrency(e.target.value);
            setConvertedAmount(null);
          }}
          className="w-full p-2 border-gray-300 rounded-md shodow-5m focus:outline-none
                 focus:ring-2 focus:ring-indigo-500"
        >
          {favorities.map((Currency) => {
            return (
              <option className="bg-gray-200" value={Currency} key={Currency}>
                {Currency}
              </option>
            );
          })}
          {currencies.filter((c) => !favorities.includes(c))}
          <option value disabled>
            &#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;
          </option>

          {currencies?.map((Currency) => {
            return (
              <option value={Currency} key={Currency}>
                {Currency}
              </option>
            );
          })}
        </select>
        <button
          onClick={() => handlefavorite(Currency)}
          className="absolute inset-y-0 pr-5 right-0 flex items-center text-5m leading-5"
        >
          {isfavorite(Currency) ? <HiStar /> : <HiOutlineStar />}
        </button>
      </div>
    </div>
  );
};
export default CurrencyDropdown;
