import express from "express";
import User from "./routers/User.js";
import cookieParser from "cookie-parser";

import cors from "cors";
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());
app.use(User);
app.get("/", (req, res) => {
  res.json({ success: true, message: "hey its work" });
});
