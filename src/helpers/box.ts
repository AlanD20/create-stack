import { logger } from './logger.js';
import boxen, { Options } from 'boxen';

const DEFAULT_OPTION: Options = {
  margin: 1,
  padding: 1,
  borderStyle: 'double',
  textAlignment: 'center',
  titleAlignment: 'left',
};

export const box = {
  error(text: string, title?: string) {
    logger.error(
      boxen(text, {
        ...DEFAULT_OPTION,
        title,
      })
    );
  },
  info(text: string, title?: string) {
    logger.info(
      boxen(text, {
        ...DEFAULT_OPTION,
        title,
      })
    );
  },
  warn(text: string, title?: string) {
    logger.warn(
      boxen(text, {
        ...DEFAULT_OPTION,
        title,
      })
    );
  },
  success(text: string, title?: string) {
    logger.success(
      boxen(text, {
        ...DEFAULT_OPTION,
        title,
      })
    );
  },
};
