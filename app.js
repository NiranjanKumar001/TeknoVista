import express from "express";

import { PORT } from "./config/env.js";

import userRouter from "./routes/user.routes.js";

import authRouter from "./routes/auth.routes.js";

import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser()); // this will parse the cookies from the request headers and make it available in the req.cookies object

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/subscriptions',subscriptionRouter);

app.use(errorMiddleware) ;

app.get("/", (req, res) => {
  res.send("Welcome to the subs tracker api");
});

app.listen(PORT, async() => {
  console.log(
    `Subs Tracker API is running on http://localhost:${PORT}`
  );

  await connectToDatabase();
});

export default app;