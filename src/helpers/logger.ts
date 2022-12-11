import { color } from './color.js';

export const logger = {
  error(...args: unknown[]) {
    console.log(color.error(...args));
  },
  warn(...args: unknown[]) {
    console.log(color.warn(...args));
  },
  info(...args: unknown[]) {
    console.log(color.info(...args));
  },
  success(...args: unknown[]) {
    console.log(color.success(...args));
  },
};
