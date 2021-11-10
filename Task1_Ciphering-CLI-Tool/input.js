import fs from 'fs';
import { optionsValue } from './options.js';

export const input = optionsValue.inputValue ? fs.createReadStream(optionsValue.inputValue, 'utf-8') : process.stdin;
