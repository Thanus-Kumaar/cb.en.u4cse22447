import express from "express";
import historyController from "../controllers/history.controller.js";

const historyRoute = express.Router()

historyRoute.post("/", historyController.handleAddHistory)
historyRoute.get("/", historyController.handleGetHistory)
historyRoute.put("/", historyController.handleUpdateHistory)

export default historyRoute;