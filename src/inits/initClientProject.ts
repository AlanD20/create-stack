import { CLIOptions } from '~/types.js';
import { WritableData } from 'fs-jetpack/types.js';
import { compileStubFile } from '../utils/compileStubFile.js';
import { createProjectDirectory, getStubPath } from '~/utils/fsUtils.js';

export const initClientProject = (cliOptions: CLIOptions): boolean => {
  const projectDir = createProjectDirectory(cliOptions.appName);

  // Resolve client template path
  const stubPath = getStubPath('client');

  // For each file, compile handlebars template
  stubPath.find({ matching: '*' }).forEach((path) => {
    const files = ['package.json', 'index.html'];

    let content: string | WritableData = stubPath.read(path) ?? '';

    if (files.includes(path)) {
      content = compileStubFile(content, {
        appName: cliOptions.appName,
      });
    }

    projectDir.write(path, content);
  });

  return projectDir.exists(projectDir.cwd()) === 'dir';
};
