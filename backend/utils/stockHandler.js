import { getListedStocks } from "../api/stockApi.js";

// Set data structure is used to store stock abbreviations in memory as it has O(1) lookup and insertion
let stockAbbreviations = new Set();

// Function to load the stocks into memory
export const loadStockAbbreviations = async () => {
  try {
    const stocks = await getListedStocks();
    for (const abbreviation of Object.values(stocks)) {
      stockAbbreviations.add(abbreviation);
    }
  } catch (error) {}
};

// Function to validate the stock abbreviation
export const validateStock = async (ticker) => {
  if (stockAbbreviations.has(ticker)) {
    return true;
  }
  // If stock abbreviation is not in memory, fetching the full list to validate
  try {
    const stocks = await getListedStocks();
    // If the stock is present in the API response, add it to the Set
    if (stocks[ticker]) {
      stockAbbreviations.add(ticker);
      return true;
    } else {
      return false;
    }
  } catch (error) {}
};
