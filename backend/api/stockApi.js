import AppError from "../utils/appError.js";
import { queryInstance } from "../utils/axiosInstance.js";

// Function to get the stocks listed in the stock exchange
export const getListedStocks = async () => {
  try {
    const response = await queryInstance.get(`/stocks`);
    // NOTE: The stock in response is a dictionary with {compnay_name: ABRV}
    return response.data.stock;
  } catch (err) {
    if (err instanceof AppError) {
      console.error(`[AppError]: ${err.message}`);
      if (err.details) console.error("Details:", err.details);
    } else {
      console.error("[Unexpected Error]:", err);
    }
  }
};

// Function to get the current price of a specific stock
export const getStockPrice = async (ticker) => {
  try {
    const response = await queryInstance.get(`/stocks/${ticker}`);
    return response.data.stock;
  } catch (error) {
    if (err instanceof AppError) {
      console.error(`[AppError]: ${err.message}`);
      if (err.details) console.error("Details:", err.details);
    } else {
      console.error("[Unexpected Error]:", err);
    }
  }
};

// Function to get the price history of a specific stock over a given period in minutes
export const getStockPriceHistory = async (ticker, minutes) => {
  try {
    const response = await queryInstance.get(
      `/stocks/${ticker}?minutes=${minutes}`
    );
    return response.data;
  } catch (error) {
    if (err instanceof AppError) {
      console.error(`[AppError]: ${err.message}`);
      if (err.details) console.error("Details:", err.details);
    } else {
      console.error("[Unexpected Error]:", err);
    }
  }
};
