import { CLIOptions } from '~/types.js';
import { logger } from '~/helpers/logger.js';
import { initClientProject } from './initClientProject.js';
import { initServerProject } from './initServerProject.js';
import { createProjectDirectory } from '~/utils/fsUtils.js';

export const initProject = async (cliOptions: CLIOptions): Promise<boolean> => {
  const projectType = cliOptions.options.projectType;
  let isSuccess = false;

  const projectDir = createProjectDirectory(cliOptions.appName);

  if (projectType === 'client') {
    isSuccess = initClientProject(projectDir, cliOptions);
  } else if (projectType === 'server') {
    isSuccess = await initServerProject(projectDir, cliOptions);
  } else {
    logger.error('Please select a project type!');
    return false;
  }

  return isSuccess;
};
