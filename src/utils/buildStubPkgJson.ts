import type { PackageJson } from 'type-fest';
import { FSJetpack } from 'fs-jetpack/types.js';
import { BuilderType, CLIOptions } from '~/types.js';

export const buildStubPkgJson = (
  projectDir: FSJetpack,
  currentPath: string,
  cliOptions: CLIOptions
) => {
  const pkg = projectDir.read(currentPath, 'json') as PackageJson;
  const builderType = cliOptions.options.builderType;

  pkg.devDependencies = {
    ...pkg.devDependencies,
    ...getBuilderPackages(builderType),
  };

  const withDocker = cliOptions.options.withDockerCompose;
  const withPM2 = cliOptions.options.withPm2;
  const withPrisma = cliOptions.options.withPrisma;

  if (withPrisma) {
    pkg.dependencies = {
      ...pkg.dependencies,
      '@prisma/client': '4.7.1',
      prisma: '^4.7.1',
    };
  }

  if (withPM2) {
    pkg.dependencies = {
      ...pkg.dependencies,
      pm2: '^5.2.2',
    };
  }

  pkg.scripts = {
    ...getStartingScripts(withPM2),
    ...getBuilderScripts(builderType),
    ...pkg.scripts,
    ...(withDocker && getDockerComposeScripts()),
    ...(withPrisma && getPrismaScripts()),
  };

  projectDir.write(currentPath, pkg);
};

//
// Following functions will return scripts for package json stub
//

function getBuilderPackages(builderType: BuilderType) {
  if (builderType === 'rollup') {
    return {
      '@babel/core': '^7.20.5',
      '@babel/preset-env': '^7.20.2',
      '@babel/preset-typescript': '^7.18.6',
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

function getBuilderScripts(builderType: BuilderType): object {
  if (builderType === 'rollup') {
    return {
      dev: 'rimraf dist && tsc && rollup -c rollup.config.js --environment NODE_ENV:local',
      watch: 'yarn dev -w',
      build:
        'rimraf dist && tsc && rollup -c rollup.config.js --environment NODE_ENV=production',
    };
  } else if (builderType === 'tsup') {
    return {
      dev: 'rimraf ./dist && tsc && tsup --config tsup.config.js',
      watch: 'yarn dev --watch src',
      build:
        'rimraf dist && tsc && tsup --config tsup.config.js --env.NODE_ENV production',
    };
  }

  return {};
}

function getDockerComposeScripts() {
  return {
    up: 'docker-compose -f server.yml up -d',
    down: 'docker-compose -f server.yml down --rmi local -v',
    'docker:install':
      'docker pull node:16.19.0 && docker pull mysql && docker pull adminer',
  };
}

function getPrismaScripts() {
  return {
    'db:mg': 'prisma migrate dev --name',
    'db:gen': 'prisma generate',
    'db:push': 'prisma db push && yarn db:generate',
  };
}

function getStartingScripts(withPM2: boolean): object {
  if (withPM2) {
    return {
      start: 'pm2-dev pm2.json',
      prod: 'pm2-runtime start pm2.json --env production && pm2 save -f',
    };
  }

  return {
    start: 'node dist/index.js',
  };
}
