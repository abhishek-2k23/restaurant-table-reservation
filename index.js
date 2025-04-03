import express from "express";
import dotenv from "dotenv";
import dbConnection from "./configuration/db.js";
import router from './routers/router.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())

//connect with database
await dbConnection();

app.listen(process.env.PORT, () => {
    console.log("Server is up at ", process.env.PORT);
})

app.get("/", (_, res) => {
    res.send("restaurant booking server")
})

//mounting routes
app.use('/api', router);