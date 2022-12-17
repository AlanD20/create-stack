#!/usr/bin/env node

import ora from 'ora';
import { Command } from 'commander';
import { box } from './helpers/box.js';
import { CLIOptions } from './types.js';
import { color } from './helpers/color.js';
import { logger } from './helpers/logger.js';
import { DEFAULT_APP_NAME } from './consts.js';
import { isPathEmpty } from './utils/fsUtils.js';
import { initProject } from './inits/initProject.js';
import {
  builderTypePrompt,
  forcePrompt,
  projectTypePrompt,
  withDockerComposePrompt,
  withPm2Prompt,
} from './utils/prompts.js';
import {
  getPackageDescription,
  getPackageVersion,
} from './utils/getPackageDetails.js';

const CLIDefaultOptions: CLIOptions = {
  appName: DEFAULT_APP_NAME,
  flags: {
    force: false,
  },
  options: {
    projectType: 'client',
    builderType: 'rollup',
    withDockerCompose: false,
    withPm2: false,
  },
};

const main = async () => {
  const cliResults = CLIDefaultOptions;
  const program = new Command();

  // Info about the CLI
  program
    .name(DEFAULT_APP_NAME)
    .description(getPackageDescription())
    .version(getPackageVersion());

  // Arguments and Options to the CLI
  program
    .argument(
      '[project]',
      "Project name, creates the directory if doesn't exist."
    )
    .option(
      '-f, --force',
      'Create a new project forcefully by overwriting existing directory',
      false
    )
    .parse(process.argv);

  // Reading given directory
  let cliAppName = program.args[0];
  if (cliAppName) {
    cliAppName = cliAppName.split('/').pop();
    cliResults.appName = cliAppName as string;
  }

  // Reading flags and showing prompts
  cliResults.flags = program.opts();

  // Don't check path in force mode
  if (!cliResults.flags.force) isPathEmpty(cliResults.appName);

  await forcePrompt(cliResults.flags);

  cliResults.options.projectType = await projectTypePrompt();

  // Prompts when user chooses server boilerplate
  if (cliResults.options.projectType === 'server') {
    cliResults.options.withDockerCompose = await withDockerComposePrompt();
    cliResults.options.withPm2 = await withPm2Prompt();
    cliResults.options.builderType = await builderTypePrompt();
  }

  // Start spinner
  const spinner = ora(color.info('Initializing project...\n')).start();

  const isSuccess = await initProject(cliResults);

  // End of spinner
  spinner.stop();

  if (!isSuccess) {
    logger.error('❌ Failed to initialize project!');
    process.exit(1);
  }

  // Final message

  logger.success('✅ Project Initialized!');

  box.success(`
    Your project is ready! Don't forget configurations such as .env file, etc..

    ${color.warn('Start your project with the follwoing commands:')}
    ${color.info(`cd ${cliResults.appName} && yarn`)}
    ${color.info('yarn dev')}

    ${color.warn('Configs:')}
      ${color.info(printConfigs(cliResults))}

    ${color.warn('CLI Version:')} ${color.info(getPackageVersion())}
  `);
};

main().catch((err) => {
  box.error('Aborting installation...');

  if (err instanceof Error) {
    logger.error(err);
  } else {
    logger.error('An unknown error has occurred.');
    console.log(err);
  }
  process.exit(1);
});

function printConfigs(cliOptions: CLIOptions) {
  if (cliOptions.options.projectType === 'client') {
    return `- Project Type: ${cliOptions.options.projectType}`;
  }

  return `
  - Project Type: ${cliOptions.options.projectType}
  - Builder Type: ${cliOptions.options.builderType}
  - PM2 Included: ${cliOptions.options.withDockerCompose}
  - Docker Compose Included ${cliOptions.options.withPm2}
  `;
}
