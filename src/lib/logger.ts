import winston from "winston";
import { getEnv } from "./env";

const env = getEnv();

const { combine, timestamp, errors, json, colorize, printf } = winston.format;
const isProduction = env.NODE_ENV === "production";

export const logger = winston.createLogger({
  level: env.LOG_LEVEL ?? (isProduction ? "info" : "debug"),
  format: isProduction
    ? combine(timestamp(), errors({ stack: true }), json())
    : combine(
        colorize(),
        timestamp(),
        errors({stack: true}),
        printf(
          ({ level, message, timestamp, stack }) => `${timestamp} ${level}: ${stack ?? message}`,
        ),
      ),
  transports: [new winston.transports.Console()],
});
