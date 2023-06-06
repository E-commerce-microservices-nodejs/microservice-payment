import express from "express";
// import cors from 'cors';
// import helmet from 'helmet';
// import morgan from 'morgan';
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import paymentRouter from "./routes/api/paymentRoutes";

dotenv.config();

const app = express();

// middleware
// app.use(cors());
// app.use(helmet());
// app.use(morgan('tiny'));
app.use(express.json());

// routes
app.use("/api/payment", paymentRouter);

// database connection
mongoose
  .connect(
    `${process.env.MONGO_URI }`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as ConnectOptions
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error: Error) => {
    console.log(`Database connection error: ${error.message}`);
  });

export default app;
