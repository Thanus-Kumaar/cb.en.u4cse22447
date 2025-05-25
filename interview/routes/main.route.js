import express from "express";
import historyRoute from "./history.route.js";

const mainRoute = express.Router();
mainRoute.use("/history", historyRoute);

export default mainRoute;