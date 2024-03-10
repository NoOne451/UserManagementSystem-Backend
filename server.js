import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from './prisma/index.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

// Middleware & Config

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes

app.use('/auth', authRouter);

// Database connection and Server initialization

const port = process.env.PORT || 8080;

prisma
  .$connect()
  .then(async () => {
    console.log('Database connected');
    app.listen(port, () => {
      console.log(`Server started on port http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.log('Error connecting to database: ', e);
  });
