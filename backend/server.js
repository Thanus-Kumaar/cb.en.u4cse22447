import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import {
  getStockTickers,
  loadStockAbbreviations,
} from "./utils/stockHandler.js";
import { refreshToken } from "./utils/refreshJWT.js";
import errorHandler from "./middleware/errorHandler.js";
import { getToken } from "./auth/tokenManager.js";
import AppError from "./utils/appError.js";
import router from "./routes/stocks.route.js";
configDotenv();

const app = express();

app.use(cors());
app.use(express.json());

// refreshing JWT token before any other query request
try {
  await refreshToken();
  console.log("Refreshed JWT");
} catch (err) {
  if (err instanceof AppError) {
    console.error(err.message);
    if (err.details) console.error("Details:", err.details);
  } else {
    console.error("[Unexpected Error]:", err);
  }
}

// loading stock list to memory
try {
  await loadStockAbbreviations();
  console.log("Loaded stock tickers: ", getStockTickers());
} catch (err) {
  if (err instanceof AppError) {
    console.error(err.message);
    if (err.details) console.error("Details:", err.details);
  } else {
    console.error("[Unexpected Error - Stock Loading]:", err);
  }
}

/**
 * @route GET /test
 * @description An endpoint for testing if the server is running and responding
 * @returns 200 - The server is running great :)
 */
app.get("/test", (req, res) => {
  console.log("Application server is running!");
});

app.use(router);

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
