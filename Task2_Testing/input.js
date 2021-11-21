import fs from 'fs';
import { getOptions } from './options.js';

export const input = getOptions().inputValue ? fs.createReadStream(getOptions().inputValue, 'utf-8') : process.stdin;
