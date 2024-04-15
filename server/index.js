import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import cors from "cors";

dotenv.config({
  path: "./.env",
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Application is running on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDb failed to connect the Database", err);
  });
