import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
configDotenv();

const app = express();

app.use(cors());
app.use(express.json());

/**
 * @route GET /test
 * @description An endpoint for testing if the server is running and responding
 * @returns 200 - The server is running great :)
 */
app.get("/test", (req, res) => {
  console.log("Application server is running!");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
