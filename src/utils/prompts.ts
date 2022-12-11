import inquirer from 'inquirer';
import { color } from '~/helpers/color.js';
import { BuilderType, Flags, ProjectType } from '~/types.js';

export const forcePrompt = async (flags: Flags) => {
  if (flags.force) {
    const { forcing } = await inquirer.prompt<{ forcing: boolean }>({
      name: 'forcing',
      type: 'confirm',
      message: color.warn(
        'Creating project forcefully will remove exisitng directory, continue?'
      ),
      default: false,
    });

    if (!forcing) process.exit(1);
  }
};

export const projectTypePrompt = async () => {
  const { type } = await inquirer.prompt<{ type: ProjectType }>({
    name: 'type',
    type: 'list',
    message: color.info('Is this project Client or Server?'),
    choices: [
      { name: 'Server', value: 'server', short: 'Server' },
      { name: 'Client', value: 'client', short: 'Client' },
    ],
    default: 'client',
  });

  return type;
};

export const builderTypePrompt = async () => {
  const { builder } = await inquirer.prompt<{ builder: BuilderType }>({
    name: 'builder',
    type: 'list',
    message: color.info('Choose builder type:'),
    choices: [
      { name: 'tsup', value: 'tsup', short: 'tsup' },
      { name: 'Rollup', value: 'rollup', short: 'Rollup' },
    ],
    default: 'rollup',
  });

  return builder;
};