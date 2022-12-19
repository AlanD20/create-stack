import jetpack from 'fs-jetpack';
import { logger } from '~/helpers/logger.js';
import { getStubPath } from './fsUtils.js';
import { FSJetpack } from 'fs-jetpack/types.js';
import { compileStubFile } from './compileStubFile.js';

const getConfigSrcPath = (src: string): FSJetpack => {
  const stubPath = getStubPath();
  return jetpack.cwd(stubPath.cwd(), 'config', src);
};

export const copyFileFromConfigDir = (
  src: string,
  dest: string,
  options?: object
) => {
  logger.info(`Copying File...`);

  const configSrcPath = getConfigSrcPath(src).cwd();

  const readConfigFile = jetpack.read(configSrcPath);

  let destination = jetpack.path(dest);

  if (jetpack.exists(destination) === 'dir') {
    destination = jetpack.path(dest, src);
  }

  jetpack.file(destination, {
    content: compileStubFile(readConfigFile, options),
  });
};

export const copyDirFromConfigDir = (src: string, dest: string) => {
  logger.info(`Copying Directory...`);

  const configSrcPath = getConfigSrcPath(src).cwd();

  const srcName = src.split('/');

  let destination = jetpack.path(dest, srcName[srcName.length - 1] as string);

  if (jetpack.exists(configSrcPath) !== 'dir') {
    logger.error(`Failed to copy ${src} Directory!`);
    return;
  }

  jetpack.copy(configSrcPath, destination);
};
