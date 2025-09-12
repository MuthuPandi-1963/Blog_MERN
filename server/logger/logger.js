// logger/logger.js
import pino from "pino";
import pretty from "pino-pretty";

// Pretty stream for local dev, structured JSON for production
const prettyStream = process.env.NODE_ENV === "production"
  ? undefined // JSON logs in production
  : pretty({
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    });

// Core logger instance
const logger = pino(
  {
    level: process.env.LOG_LEVEL || "info", // info, warn, error
  },
  prettyStream
);

// Express middleware logger

export { logger };
