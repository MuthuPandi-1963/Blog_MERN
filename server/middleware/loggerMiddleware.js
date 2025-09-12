import { logger } from "../logger/logger.js";
import { pinoHttp } from "pino-http";
import useragent from "useragent";

export const loggerMiddleware = pinoHttp({
  logger,

  // Set log level dynamically based on status code
  customLogLevel(res, err) {
    if (err || res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },

  // Custom log message
  customSuccessMessage(req, res) {
    return `Request completed: ${req.method} ${req.url} [${res.statusCode}]`;
  },

  // Add custom request/response data
  serializers: {
    req(req) {
      const agent = useragent.parse(req.headers["user-agent"]);
      return {
        method: req.method,
        url: req.url,
        ip: req.headers["x-forwarded-for"] || req.socket?.remoteAddress,
        device: agent.device.toString(),
        os: agent.os.toString(),
        browser: agent.toAgent(),
      };
    },
    res(res) {
      return {
        statusCode: res.statusCode,
      };
    },
  },

  // Extra metadata for every log line
  customProps(req) {
    return {
      host: req.headers.host,
      pid: process.pid,
      datetime: new Date().toISOString(),
    };
  },
});
