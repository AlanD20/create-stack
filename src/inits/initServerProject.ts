import { CLIOptions } from '~/types.js';
import { getStubPath } from '~/utils/fsUtils.js';
import { compileStubFile } from '~/utils/compileStubFile.js';
import { FSJetpack, WritableData } from 'fs-jetpack/types.js';
import { buildStubPkgJson } from '~/utils/buildStubPkgJson.js';
import {
  copyDirFromConfigDir,
  copyFileFromConfigDir,
} from '~/utils/copyFromConfigDir.js';

export const initServerProject = async (
  projectDir: FSJetpack,
  cliOptions: CLIOptions
): Promise<boolean> => {
  copyConfigFiles(projectDir.cwd(), cliOptions);

  // Resolve server template path
  const stubPath = getStubPath('server');

  // For each file, compile handlebars template
  stubPath.find({ matching: '*' }).forEach((path: string) => {
    const files = ['package.json', 'README.md', 'src\\index.ts', 'pm2.json'];

    let content: string | WritableData = stubPath.read(path) ?? '';

    if (files.includes(path)) {
      const replaceTo = {
        builderType: `- ${cliOptions.options.builderType}`,
        appName: cliOptions.appName,
        ...(path === 'README.md' && buildStubReadme(cliOptions)),
      };

      content = compileStubFile(content, replaceTo, {
        // don't escape if current file is README.md
        ...(path === 'README.md' && { noEscape: true }),
      });
    }

    // Write the changes to the file
    projectDir.write(path, content);

    // build package.json
    if (path === 'package.json') {
      buildStubPkgJson(projectDir, path, cliOptions);
    }
  });

  return projectDir.exists(projectDir.cwd()) === 'dir';
};

function copyConfigFiles(projectDirPath: string, cliOptions: CLIOptions) {
  const builderType = cliOptions.options.builderType;

  // Copy builder config to project directory
  copyFileFromConfigDir(`${builderType}.config.js`, projectDirPath);

  // Copy .babelrc for rollup config
  if (builderType === 'rollup') {
    copyFileFromConfigDir(`.babelrc`, projectDirPath);
  }

  // Copy docker compose file
  if (cliOptions.options.withDockerCompose) {
    copyFileFromConfigDir('server.yml', projectDirPath);
  }

  // Copy pm2 config file
  if (cliOptions.options.withPm2) {
    copyFileFromConfigDir('pm2.json', projectDirPath, {
      appName: cliOptions.appName,
    });
  }

  // Copy Prisma files
  if (cliOptions.options.withPrisma) {
    copyDirFromConfigDir('server/prisma', projectDirPath);
    copyFileFromConfigDir(
      'server/prisma.ts',
      projectDirPath + '/src/app/prisma.ts'
    );
    copyFileFromConfigDir(
      'server/validator.prisma.ts',
      projectDirPath + '/src/app/validator.ts'
    );
  } else {
    copyFileFromConfigDir(
      'server/validator.base.ts',
      projectDirPath + '/src/app/validator.ts'
    );
  }
}

function buildStubReadme(cliOptions: CLIOptions) {
  let replaceTo = {};

  if (cliOptions.options.withDockerCompose)
    replaceTo = {
      dockerCommand: `- Docker compose:

    \`\`\`bash
     yarn docker:install # Pull images
     yarn up # Create Docker-compose container
     yarn down # Delete Docker-compose container
    \`\`\``,
      dockerDescription:
        '- Docker compose template for Node app + MySQL + Adminer.',
    };

  if (cliOptions.options.withPrisma)
    replaceTo = { ...replaceTo, withPrisma: ' + Prisma' };

  if (cliOptions.options.withPm2)
    replaceTo = { ...replaceTo, withPm2: '- PM2' };

  return replaceTo;
}
