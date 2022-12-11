import type { PackageJson } from 'type-fest';
import { WritableData } from 'fs-jetpack/types.js';
import { BuilderType, CLIOptions } from '~/types.js';
import { copyConfigFile } from '~/utils/copyConfigFile.js';
import { compileStubFile } from '~/utils/compileStubFile.js';
import { createProjectDirectory, getStubPath } from '~/utils/fsUtils.js';

export const initServerProject = async (
  cliOptions: CLIOptions
): Promise<boolean> => {
  const projectDir = createProjectDirectory(cliOptions.appName);

  const builderType = cliOptions.options.builderType;

  // Copy builder config to project directory
  copyConfigFile(`${builderType}.config.js`, projectDir.cwd());

  // Resolve server template path
  const stubPath = getStubPath('server');

  // For each file, compile handlebars template
  stubPath.find({ matching: '*' }).forEach((path) => {
    const files = ['package.json', 'README.md', 'src\\index.ts', 'pm2.json'];

    let content: string | WritableData = stubPath.read(path) ?? '';

    if (files.includes(path)) {
      content = compileStubFile(content, {
        builderType,
        appName: cliOptions.appName,
      });
    }

    projectDir.write(path, content);

    // Add builder dependencies to package.json
    if (path === 'package.json') {
      const pkg = projectDir.read(path, 'json') as PackageJson;
      pkg.devDependencies = {
        ...pkg.devDependencies,
        ...getBuilderPackages(builderType),
      };
      projectDir.write(path, pkg);
    }
  });

  return projectDir.exists(projectDir.cwd()) === 'dir';
};

function getBuilderPackages(builderType: BuilderType) {
  if (builderType === 'rollup') {
    return {
      rollup: '^3.7.2',
      '@rollup/plugin-babel': '^6.0.3',
      '@rollup/plugin-json': '^5.0.2',
      '@rollup/plugin-commonjs': '^23.0.4',
      '@rollup/plugin-typescript': '^10.0.1',
      'rollup-plugin-hoist-import-deps': '^1.1.0',
      'rollup-plugin-ts-paths': '^1.0.5',
      'rollup-plugin-uglify': '^6.0.4',
    } as const;
  } else if (builderType === 'tsup') {
    return {
      tsup: '^6.5.0',
    } as const;
  }

  return {};
}
