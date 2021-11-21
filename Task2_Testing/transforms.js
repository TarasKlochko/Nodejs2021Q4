import { Transform } from 'stream';
import { cipher } from './cipher.js';
import { getOptions } from './options.js';

export let transforms = [];

function createTransformStream(shift, encrypt, atbash = 0) {
  const transform = new Transform({
    transform(chunk, encoding, callback) {
      const chankStringigied = chunk.toString().trim();
      callback(null, cipher(chankStringigied, shift, encrypt, atbash) + '\n');
    },
  });
  transforms.push(transform);
}

getOptions()
  .configValue.split('-')
  .forEach((config) => {
    let [cipherType, value] = config.split('');
    if (cipherType === 'C') {
      createTransformStream(1, +value, 0);
    }
    if (cipherType === 'R') {
      createTransformStream(8, +value, 0);
    }
    if (cipherType === 'A') {
      createTransformStream(null, null, 1);
    }
  });
