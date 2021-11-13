import { pipeline } from 'stream';
import { input } from './input.js';
import { output } from './output.js';
import { transforms } from './transforms.js';

pipeline(input, ...transforms, output, (err) => {
  if (err) {
    console.log('Error', err);
  }
});
