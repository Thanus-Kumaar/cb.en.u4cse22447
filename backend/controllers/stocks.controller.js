import AppError from "../utils/appError.js";
import { getStockPriceHistory } from "../api/stockApi.js";
import { validateStock } from "../utils/stockHandler.js";

const calculateAverage = (priceHistory) => {
  const total = priceHistory.reduce((sum, entry) => sum + entry.price, 0);
  return total / priceHistory.length;
};

const alignPricesByTimestamp = (stockHistory) => {
  const priceMap = new Map();
  stockHistory.forEach((entry) => {
    priceMap.set(entry.lastUpdatedAt, entry.price);
  });
  return priceMap;
};

const calculateCorrelation = (history1, history2) => {
  const timestamps = Array.from(history1.keys()).filter((ts) =>
    history2.has(ts)
  );
  if (timestamps.length < 2) return null;

  const prices1 = timestamps.map((ts) => history1.get(ts));
  const prices2 = timestamps.map((ts) => history2.get(ts));
  const n = Math.min(history1.length, history2.length);

  const meanX = prices1.reduce((a, b) => a + b, 0) / n;
  const meanY = prices2.reduce((a, b) => a + b, 0) / n;

  const numerator = prices1.reduce(
    (sum, xi, i) => sum + (xi - meanX) * (prices2[i] - meanY),
    0
  );
  const denominatorX = Math.sqrt(
    prices1.reduce((sum, xi) => sum + (xi - meanX) ** 2, 0)
  );
  const denominatorY = Math.sqrt(
    prices2.reduce((sum, yi) => sum + (yi - meanY) ** 2, 0)
  );

  const denominator = denominatorX * denominatorY;
  return denominator === 0 ? null : numerator / denominator;
};

export const handleGetAveragePrice = async (req, res, next) => {
  try {
    const { ticker } = req.params;
    const { minutes, aggregation } = req.query;

    if (aggregation !== "average") {
      throw new AppError("Only average aggregation is supported", 400);
    }

    // Validate the stock
    const isValid = await validateStock(ticker);
    if (!isValid) {
      throw new AppError(`Invalid stock ticker: ${ticker}`, 400);
    }

    const priceHistory = await getStockPriceHistory(ticker, minutes);
    const averageStockPrice = calculateAverage(priceHistory);

    res.status(200).json({ averageStockPrice, priceHistory });
  } catch (err) {
    next(err);
  }
};

export const handleGetCorrelation = async (req, res, next) => {
  try {
    const { minutes, ticker: tickers } = req.query;

    if (!Array.isArray(tickers) || tickers.length !== 2) {
      throw new AppError("Exactly two ticker parameters are required", 400);
    }

    const cleanedTickers = tickers.map((t) =>
      t.replace(/[{}]/g, "").toUpperCase()
    );
    const [ticker1, ticker2] = cleanedTickers;

    // Validate the tickers
    const valid1 = await validateStock(ticker1);
    const valid2 = await validateStock(ticker2);
    if (!valid1 || !valid2) {
      throw new AppError("One or both tickers are invalid", 400);
    }

    const [history1, history2] = await Promise.all([
      getStockPriceHistory(ticker1, minutes),
      getStockPriceHistory(ticker2, minutes),
    ]);

    const priceMap1 = alignPricesByTimestamp(history1);
    const priceMap2 = alignPricesByTimestamp(history2);

    const correlation = calculateCorrelation(priceMap1, priceMap2);

    res.status(200).json({
      correlation,
      stocks: {
        [ticker1]: {
          averagePrice: calculateAverage(history1),
          priceHistory: history1,
        },
        [ticker2]: {
          averagePrice: calculateAverage(history2),
          priceHistory: history2,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
