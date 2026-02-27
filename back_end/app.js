import express from "express";
import dotenv from "dotenv";
import connectMongoDatabase from "./config/db.js";
import userAuth from "./routes/userRoute.js";
import notesRoute from "./routes/notesRoute.js"
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;
dotenv.config({ path: "./config/config.env" });
connectMongoDatabase();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(`/api`,userAuth);
app.use(`/api`,notesRoute);











app.listen(PORT , ()=>{console.log(`server is on port ${PORT}`)})