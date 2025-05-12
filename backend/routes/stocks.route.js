import express from "express";
import {
  handleGetAveragePrice,
  handleGetCorrelation,
} from "../controllers/stocks.controller.js";

const router = express.Router();


router.get("/stocks/:ticker", handleGetAveragePrice);


router.get("/stockcorrelation", handleGetCorrelation);

export default router;
