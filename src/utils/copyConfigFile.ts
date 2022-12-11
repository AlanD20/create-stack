import path from 'path';
import jetpack from 'fs-jetpack';
import { compileStubFile } from './compileStubFile.js';

export const copyConfigFile = (src: string, dest: string, options?: object) => {
  const configFile = jetpack.cwd(path.resolve('stubs/config'), src);

  const readConfigFile = jetpack.read(configFile.cwd());

  const destination = jetpack.path(dest, src);

  jetpack.file(destination, {
    content: compileStubFile(readConfigFile, options),
  });
};
