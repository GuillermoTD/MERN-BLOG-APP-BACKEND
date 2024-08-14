import express from 'express';
import AuthRouter from "./routes/AuthRouter.js"
import dotenv from 'dotenv';

dotenv.config()

const app = express();

export const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/auth/",AuthRouter)

export default app;
