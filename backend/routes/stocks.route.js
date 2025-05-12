import express from "express";
import {
  handleGetAveragePrice,
  handleGetCorrelation,
} from "../controllers/stocks.controller.js";

const router = express.Router();

/**
 * @route GET /stocks/:ticker
 * @description Get the average price for a specific stock ticker
 * @param {string} ticker - The stock ticker symbol (e.g., 'NVDA', 'PYPL')
 * @returns {object} - The average price and price history of the stock
 */
router.get("/stocks/:ticker", handleGetAveragePrice);

/**
 * @route GET /stockcorrelation
 * @description Get the correlation between two stocks' price movements over a specified time range
 * @query {number} minutes - The time range (in minutes) for the correlation calculation
 * @query {string} ticker - The stock tickers to compare (should be two tickers)
 * @returns {object} - The correlation coefficient and price history of the two stocks
 */
router.get("/stockcorrelation", handleGetCorrelation);

export default router;
