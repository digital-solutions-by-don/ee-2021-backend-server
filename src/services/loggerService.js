import winston from 'winston';

const logLevels = {
  fatal: 0,
  crit: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const { LOG_LEVEL = 'info' } = process.env;

const customColors = {
  trace: 'white',
  debug: 'green',
  info: 'green',
  warn: 'yellow',
  crit: 'blue',
  fatal: 'red',
};

export const logger = winston.createLogger({
  level: LOG_LEVEL,
  levels: logLevels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.prettyPrint(),
    winston.format.timestamp({
      format: 'DD-MM-YYYY hh:mm:ss A',
    }),
    winston.format.printf(
      (nfo) => `${nfo.timestamp} - ${nfo.level}: ${nfo.message}`
    )
  ),
  transports: [new winston.transports.Console()],
});

winston.addColors(customColors);

logger.stream = {
  write: (message) => logger.info(message),
};

const origLog = logger.log;

logger.log = (level, msg) => {
  const objType = Object.prototype.toString.call(msg);
  if (objType === '[object Error]') {
    origLog.call(logger, level, msg.toString());
  } else {
    origLog.call(logger, level, msg);
  }
};
