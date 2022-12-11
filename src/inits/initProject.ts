import { CLIOptions } from '~/types.js';
import { logger } from '~/helpers/logger.js';
import { initClientProject } from './initClientProject.js';
import { initServerProject } from './initServerProject.js';

export const initProject = async (cliOptions: CLIOptions): Promise<boolean> => {
  const projectType = cliOptions.options.projectType;

  if (projectType === 'client') {
    return initClientProject(cliOptions);
  } else if (projectType === 'server') {
    return await initServerProject(cliOptions);
  } else {
    logger.error('Please select a project type!');
    return false;
  }
};
