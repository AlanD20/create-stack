import { CLIOptions } from '~/types.js';
import { getStubPath } from '~/utils/fsUtils.js';
import { copyConfigFile } from '~/utils/copyConfigFile.js';
import { compileStubFile } from '~/utils/compileStubFile.js';
import { FSJetpack, WritableData } from 'fs-jetpack/types.js';
import { buildStubPkgJson } from '~/utils/buildStubPkgJson.js';

export const initServerProject = async (
  projectDir: FSJetpack,
  cliOptions: CLIOptions
): Promise<boolean> => {
  const builderType = cliOptions.options.builderType;

  // Copy builder config to project directory
  copyConfigFile(`${builderType}.config.js`, projectDir.cwd());

  // Copy .babelrc for rollup config
  if (builderType === 'rollup') {
    copyConfigFile(`.babelrc`, projectDir.cwd());
  }

  // Copy docker compose file
  if (cliOptions.options.withDockerCompose) {
    copyConfigFile(`server.yml`, projectDir.cwd());
  }

  // Copy pm2 config file
  if (cliOptions.options.withPm2) {
    copyConfigFile(`pm2.json`, projectDir.cwd());
  }

  // Resolve server template path
  const stubPath = getStubPath('server');

  // For each file, compile handlebars template
  stubPath.find({ matching: '*' }).forEach((path: string) => {
    const files = ['package.json', 'README.md', 'src\\index.ts', 'pm2.json'];

    let content: string | WritableData = stubPath.read(path) ?? '';

    if (files.includes(path)) {
      content = compileStubFile(content, {
        builderType,
        appName: cliOptions.appName,
      });
    }

    projectDir.write(path, content);

    // build package.json
    if (path === 'package.json') {
      buildStubPkgJson(projectDir, path, cliOptions);
    }
  });

  return projectDir.exists(projectDir.cwd()) === 'dir';
};
