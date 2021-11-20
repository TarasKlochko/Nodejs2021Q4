import fs from 'fs';
import { options } from './options.js';

export const output = options.outputValue ? fs.createWriteStream(options.outputValue, { flags: 'a' }) : process.stdout;
