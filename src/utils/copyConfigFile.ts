import jetpack from 'fs-jetpack';
import { compileStubFile } from './compileStubFile.js';
import { logger } from '~/helpers/logger.js';
import { getStubPath } from './fsUtils.js';

export const copyConfigFile = (src: string, dest: string, options?: object) => {
  logger.info(`Copying ${src}`);

  const stubPath = getStubPath();

  const configFile = jetpack.cwd(stubPath.cwd(), 'config', src);

  const readConfigFile = jetpack.read(configFile.cwd());

  const destination = jetpack.path(dest, src);

  jetpack.file(destination, {
    content: compileStubFile(readConfigFile, options),
  });
};
