import express from 'express';
import AuthRouter from "./routes/AuthRouter.js"
import dotenv from 'dotenv';

const app = express();

dotenv.config()

// Middleware para interpretar JSON
app.use(express.json());

// Middleware para interpretar datos de formulario codificados en URL
app.use(express.urlencoded({ extended: true }));


export const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/auth/",AuthRouter)

export default app;
