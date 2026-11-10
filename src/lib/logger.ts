import winston from "winston";

const { combine, timestamp, errors, json, colorize, printf } = winston.format;
const isProduction = process.env.NODE_ENV === "production";

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL ?? (isProduction ? "info" : "debug"),
  format: isProduction
    ? combine(timestamp(), errors({ stack: true }), json())
    : combine(
        colorize(),
        timestamp(),
        errors(),
        printf(
          ({ level, message, timestamp, stack }) => `${timestamp} ${level}: ${stack ?? message}`,
        ),
      ),
  transports: [new winston.transports.Console()],
});
