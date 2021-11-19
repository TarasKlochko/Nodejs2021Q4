import { access, constants } from 'fs';
import path, { dirname } from 'path';

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
  let isDouble = false;
  for (const key in optionsKeyShortAmount) {
    if (optionsKeyShortAmount[key] > 1) isDouble = true;
  }
  if (isDouble) {
    process.stderr.write('Please delete double option!');
    process.exit(1);
  }
}

checkDoubleKey();

function classifyOptionsKey(short, full) {
  let option = optionsKey.filter((key) => key === short || key === full).toString();
  return option ? option : null;
}

const classifiedOptions = {
  config: classifyOptionsKey('-c', '--config'),
  input: classifyOptionsKey('-i', '--input'),
  output: classifyOptionsKey('-o', '--output'),
};

function getOptionsValue(flag) {
  const flagIndex = process.argv.indexOf(flag);
  const optionValue = flagIndex !== -1 ? process.argv[flagIndex + 1] : null;
  if (optionValue) {
    return optionValue[0] !== '-' ? optionValue : null;
  }
  return null;
}

export const optionsValue = {
  configValue: getOptionsValue(classifiedOptions.config),
  inputValue: getOptionsValue(classifiedOptions.input),
  outputValue: getOptionsValue(classifiedOptions.output),
};

function configValueValidation(configValue) {
  if (configValue) {
    const isCorrectConfigValue = configValue.split('-').every((config) => /(^[C|R][0|1]$)|(^[A]$)/.test(config));
    if (!isCorrectConfigValue) {
      process.stderr.write('Please write correct config value!');
      process.exit(1);
    }
  }
  if (!configValue) {
    process.stderr.write('Please write config option!');
    process.exit(1);
  }
}

configValueValidation(optionsValue.configValue);

function inputValueValidation(file) {
  if (file) {
    access(path.join(__dirname, file), constants.F_OK, (err) => {
      if (err) {
        process.stderr.write(`File "${file}" does not exist.\nPlease write correct input value!`);
        process.exit(1);
      }
    });
    access(path.join(__dirname, file), constants.R_OK, (err) => {
      if (err) {
        process.stderr.write(`File "${file}" is not readable.\nPlease write correct input value!`);
        process.exit(1);
      }
    });
  }
  if (classifiedOptions.input && !file) {
    process.stderr.write('Input option is empty.\nPlease write correct input value!');
    process.exit(1);
  }
}

inputValueValidation(optionsValue.inputValue);

function outputValueValidation(file) {
  if (file) {
    access(path.join(__dirname, file), constants.F_OK | constants.W_OK, (err) => {
      if (err) {
        process.stderr.write(
          `File "${file}" ${
            err.code === 'ENOENT' ? 'does not exist' : 'is read-only'
          }.\nPlease write correct output value!`
        );
        process.exit(1);
      }
    });
  }
  if (classifiedOptions.output && !file) {
    process.stderr.write('Output option is empty.\nPlease write correct output value!');
    process.exit(1);
  }
}

outputValueValidation(optionsValue.outputValue);
