import { pino } from "pino";
import PinoPretty from "pino-pretty";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
    },
  },
});

export default logger;
