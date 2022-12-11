import Handlebars from 'handlebars';
import type { WritableData } from 'fs-jetpack/types.js';

export const compileStubFile = (
  content: string = '',
  obj: object = {}
): WritableData => {
  if (!content) return content;

  const template = Handlebars.compile(content);
  return template(obj);
};
