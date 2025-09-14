import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors'
import 'dotenv/config';
import cors from 'cors';
import {logger} from './logger/logger.js';        // Pino HTTP logger
import { loggerMiddleware } from './middleware/loggerMiddleware.js';
import prisma from './config/prismaConfig.js';  // Prisma Client
import { apiLimiter } from './utils/limiter.js';
import AppError from './handlers/AppError.js';

import CategoryRouter from './routes/categories.routes.js';
import countriesRouter from './routes/countries.routes.js';
import errorHandler from './handlers/globalHandler.js';
import tagsRouter from './routes/tags.routes.js';
import blogRouter from './routes/blog.routes.js';
import { authRouter } from './routes/auth.routes.js';
// import { sanitizeInput } from './utils/xss.js';

// ========================
// APP INITIALIZATION
// ========================
const app = express();
const PORT = process.env.PORT || 3000;

// ========================
// GLOBAL MIDDLEWARES
// ========================

// 1. Security headers (must be at the top)
app.use(helmet());

// 2. JSON & URL-encoded parser
app.use(express.json({ limit: '100kb' })); // Prevent large payloads
app.use(express.urlencoded({ extended: true }));

// 3. Cookie parser
app.use(cookieParser());

const whitelist = [process.env.CLIENT_URL, 'http://localhost:5173']
// 3. CORS configuration

app.use(cors( {
  origin: process.env.CLIENT_URL,
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
}
))

// 4. Sanitize input to prevent XSS attacks
// app.use(sanitizeInput);

// 5. Rate limiting (before routes)
app.use('/api', apiLimiter);

// 6. Request logger (Pino)
app.use(loggerMiddleware);

const whitelist = [process.env.CLIENT_URL , "http://localhost:5173"]
app.use(cors( {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
))
// ========================
// HEALTH CHECK ROUTE
// ========================
app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`; // Simple DB check
    res.status(200).json({ status: 'OK', database: 'Connected' });
  } catch (err) {
    res.status(500).json({ status: 'Error', database: 'Disconnected', error: err.message });
  }
});

// ========================
// API ROUTES
// ========================
app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API!' });
});

// **Your actual routes must come BEFORE error handlers**
app.use("/api/categories", CategoryRouter);
app.use("/api/countries", countriesRouter);
app.use("/api/tags", tagsRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/auth", authRouter);


// ========================
// 404 HANDLER (AFTER ROUTES)
// ========================
// app.all(/.*/, (req, res, next) => {
//   next(new AppError(`Route not found: ${req.originalUrl}`, 404));
// });


// ========================
// GLOBAL ERROR HANDLER (LAST)
// ========================
app.use(errorHandler);

// ========================
// SERVER START
// ========================
app.listen(PORT, async () => {
  try {
    const res = await prisma.$connect();
    
    logger.info(`Database Connected successfully`)
    logger.info(`Server running on http://localhost:${PORT}`);
  } catch (err) {
    logger.error(' Failed to connect to database:', err.message);
    process.exit(1);
  }
});
