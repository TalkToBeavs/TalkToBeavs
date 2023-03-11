import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Auth
import register from "./routes/auth/register.js";
import login from "./routes/auth/login.js";

// Social
import follow_user from "./routes/social/follow_user.js";
import create_post from "./routes/feed/create_post.js";

// Sockets
import { Server, Socket } from "socket.io";
import newConnection from "./sockets/handlers/new_connection.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth/register", register);
app.use("/api/auth/login", login);
app.use("/api/social/follow_user", follow_user);
app.use("/api/feed/create_post", create_post);

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

const server = app.listen(PORT, () => {
  console.log(`[Backend ⚡️]: Server is running on port ${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  newConnection(socket, io);
});
