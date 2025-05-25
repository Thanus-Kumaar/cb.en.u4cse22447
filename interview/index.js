import express from "express";
import cors from "cors";

import mainRoute from "./routes/main.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
    res.status(200).send("Server is running!");
})

app.use("/api", mainRoute);

app.listen(3000, ()=> {
    console.log("Application is running in port 3000!");
})