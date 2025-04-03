import express from "express";
import dotenv from "dotenv";
dotenv.config();
import dbConnection from "./configuration/db.js";

const app = express();
dbConnection();

app.listen(process.env.PORT, () => {
    console.log("Server is up at ", process.env.PORT);
})

app.get("/", (_, res) => {
    res.send("restaurant booking server")
})
