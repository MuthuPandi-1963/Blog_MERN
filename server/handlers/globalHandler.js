// handlers/globalHandler.js
import { logger } from "../logger/logger.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Log with Pino
  logger.error({
    error: {
      message: err.message,
      stack: err.stack,
      statusCode,
      path: req.originalUrl,
      method: req.method,
    },
  });
  console.log(err);
  
  res.status(statusCode).json({
    success: false,
    status: "error",
    message,
  });
};

export default errorHandler;
