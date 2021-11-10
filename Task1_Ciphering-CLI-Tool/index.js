import { pipeline } from 'stream';
import { input } from './input.js';
import { output } from './output.js';

pipeline(input, output, (err) => {
  if (err) {
    console.log('Error', err);
  }
});
