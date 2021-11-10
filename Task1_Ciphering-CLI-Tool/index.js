import fs from 'fs';
import { access, constants } from 'fs';
import path, { dirname } from 'path';
import { pipeline } from 'stream';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

function getOptionsKey() {
  return process.argv.filter((value) => /(^[-]{2}config|input|output)$|(^[-][c|i|o]$)/.test(value));
}

const optionsKey = getOptionsKey();

function checkDoubleKey() {
  const optionsKeyShort = optionsKey.map((key) => (/^[-]{2}/.test(key) ? (key = key.slice(1, 3)) : key));
  let optionsKeyShortAmount = optionsKeyShort.reduce((acc, key) => ((acc[key] = 1 + (acc[key] || 0)), acc), {});
  console.log('optionsKeyShortAmount', optionsKeyShortAmount);
  let isDouble = false;
  for (const key in optionsKeyShortAmount) {
    if (optionsKeyShortAmount[key] > 1) isDouble = true;
  }
  console.log(isDouble);
  // return isDouble
}

checkDoubleKey();

console.log(optionsKey);

function classifyOptionsKey(short, full) {
  let option = optionsKey.filter((key) => key === short || key === full).toString();
  return option ? option : null;
}

function getOptionsValue(flag) {
  const flagIndex = process.argv.indexOf(flag);
  const optionValue = flagIndex !== -1 ? process.argv[flagIndex + 1] : null;
  if (optionValue) {
    return optionValue[0] !== '-' ? optionValue : null;
  }
  return null;
}

const classifiedOptions = {
  config: classifyOptionsKey('-c', '--config'),
  input: classifyOptionsKey('-i', '--input'),
  output: classifyOptionsKey('-o', '--output'),
};

console.log(classifiedOptions);

const optionsValue = {
  configValue: getOptionsValue(classifiedOptions.config),
  inputValue: getOptionsValue(classifiedOptions.input),
  outputValue: getOptionsValue(classifiedOptions.output),
};

console.log('optionsValue', optionsValue);

function configValueValidation(configValue) {
  if (configValue) {
    return configValue.split('-').every((config) => /(^[C|R][0|1]$)|(^[A]$)/.test(config));
  }
  return false;
}

function inputValueValidation(file) {
  if (file) {
    access(path.join(__dirname, file), constants.F_OK, (err) => {
      console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
    });
    access(path.join(__dirname, file), constants.R_OK, (err) => {
      console.log(`${file} ${err ? 'is not readable' : 'is readable'}`);
    });
  } else {
    console.log('Input option is empty');
  }
}

inputValueValidation(optionsValue.inputValue);

function outputValueValidation(file) {
  if (file) {
    access(path.join(__dirname, file), constants.F_OK | constants.W_OK, (err) => {
      if (err) {
        console.error(`${file} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`);
      } else {
        console.log(`${file} exists, and it is writable`);
      }
    });
  } else {
    console.log('Output option is empty');
  }
}

outputValueValidation(optionsValue.outputValue);

console.log('Correct', configValueValidation(optionsValue.configValue));
console.log(optionsValue);

const input = optionsValue.inputValue ? fs.createReadStream(optionsValue.inputValue, 'utf-8') : process.stdin;
const output = optionsValue.outputValue
  ? fs.createWriteStream(optionsValue.outputValue, { flags: 'a' })
  : process.stdout;

pipeline(input, output, (err) => {
  if (err) {
    console.log('Error', err);
  }
});
