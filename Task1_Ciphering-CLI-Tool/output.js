import fs from 'fs';
import { optionsValue } from './options.js';

export const output = optionsValue.outputValue
  ? fs.createWriteStream(optionsValue.outputValue, { flags: 'a' })
  : process.stdout;
