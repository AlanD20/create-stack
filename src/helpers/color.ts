import chalk from 'chalk';

export const color = {
  error(...args: unknown[]): string {
    return chalk.red(...args);
  },
  warn(...args: unknown[]): string {
    return chalk.yellow(...args);
  },
  info(...args: unknown[]): string {
    return chalk.cyan(...args);
  },
  success(...args: unknown[]): string {
    return chalk.green(...args);
  },
};
