import { CLIOptions } from '~/types.js';
import { getStubPath } from '~/utils/fsUtils.js';
import { FSJetpack, WritableData } from 'fs-jetpack/types.js';
import { compileStubFile } from '../utils/compileStubFile.js';

export const initClientProject = (
  projectDir: FSJetpack,
  cliOptions: CLIOptions
): boolean => {
  // Resolve client template path
  const stubPath = getStubPath('client');

  // For each file, compile handlebars template
  stubPath.find({ matching: '*' }).forEach((path) => {
    const files = ['package.json', 'index.html', 'src\\pages\\Dashboard.tsx'];

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
