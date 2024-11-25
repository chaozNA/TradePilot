import { createLogger, format, transports } from "winston";

export const logger = createLogger({
  transports: [
    new transports.Console({
      handleExceptions: true,
      format: format.json(),
    }),
  ],
});
