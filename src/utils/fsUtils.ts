import path from 'path';
import jetpack from 'fs-jetpack';
import { fileURLToPath } from 'url';
import { box } from '~/helpers/box.js';
import { color } from '~/helpers/color.js';
import { FSJetpack } from 'fs-jetpack/types.js';
import { logger } from '~/helpers/logger.js';

export const getStubPath = (...dir: string[]): FSJetpack => {
  // import.meta.url returns main script file
  // https://nodejs.org/api/esm.html#importmetaurl
  const distFile = fileURLToPath(import.meta.url);
  const distPath = path.dirname(distFile);
  return jetpack.cwd(distPath, '../stubs', ...dir);
};

export const isPathEmpty = (appName: string) => {
  logger.info('Checking project directory exists...');

  const projectDir = jetpack.cwd(appName);
  const path = jetpack.exists(projectDir.cwd());

  if (path === 'dir') {
    box.error(
      `Failed to create project\nChange the project name or create with ${color.info(
        '-f'
      )} flag`
    );
    process.exit(1);
  }
};

export const createProjectDirectory = (appName: string): FSJetpack => {
  logger.info('Creating project directory...');

  const projectDir = jetpack.cwd(appName);

  // Create directory, overwrite if exists
  jetpack.dir(projectDir.cwd(), {
    empty: true,
  });

  return projectDir;
};
