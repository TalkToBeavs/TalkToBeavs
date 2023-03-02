import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import register from "./routes/register.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/register", register);

// Default Route
app.get("/", (req, res) => {
  res.send("Hello TalkToBeavs!");
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("[Backend ⚡️]: Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`[Backend ⚡️] Server Running on port ${PORT}`);
});
