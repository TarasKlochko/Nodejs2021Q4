import fs from 'fs';
import { getOptions } from './options.js';

export const output = getOptions().outputValue
  ? fs.createWriteStream(getOptions().outputValue, { flags: 'a' })
  : process.stdout;
