export interface CLIOptions {
  appName: string;
  flags: Flags;
  options: ProjectOptions;
}

export interface Flags {
  force: boolean;
}

export interface ProjectOptions {
  projectType: ProjectType;
  builderType: BuilderType;
}

export type ProjectType = 'client' | 'server';

export type BuilderType = 'tsup' | 'rollup';
