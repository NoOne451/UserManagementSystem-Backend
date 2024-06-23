import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from './prisma/index.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import { createProxyMiddleware } from 'http-proxy-middleware';

// Middleware & Config

const app = express();
dotenv.config();
// app.use(cors());

app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://usermanagementsystem-backend.onrender.com',
    changeOrigin: true,
    secure: true,
    xfwd: true,
    cookieDomainRewrite: 'usermanagementsystem-frontend.onrender.com',
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers['access-control-allow-origin'] =
        'https://usermanagementsystem-frontend.onrender.com';
      proxyRes.headers['access-control-allow-credentials'] = 'true';
    },
  })
);
// Routes

app.get('/api', (req, res) => {
  res.send('User Management System Server');
});
app.use('/api/auth', authRouter);

app.use((req, res, next) => {
  res.status(404).send('Invalid endpoint,please check other endpoints');
});

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
    console.log('Error connecting to database: ');
  });
