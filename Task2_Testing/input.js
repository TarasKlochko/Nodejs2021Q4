import fs from 'fs';
import { options } from './options.js';

export const input = options.inputValue ? fs.createReadStream(options.inputValue, 'utf-8') : process.stdin;
