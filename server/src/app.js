import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import userRouter from "./routes/user.router.js";

app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "App is running fine" });
});

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ error: err.message });
  }
});

export { app };
