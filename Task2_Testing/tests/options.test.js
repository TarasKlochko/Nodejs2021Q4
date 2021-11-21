import { spawn } from 'child_process';

describe('Test CLI inputs (Error scenarios)', () => {
  test('Should return Error if user passes the same cli argument twice', (done) => {
    const configValue = 'C1';
    const testApp = spawn('node', ['options.js', '-c', configValue, '-c', configValue]);

    testApp.stderr.on('data', (data) => {
      expect(data.toString()).toBe('Please delete double option!');
      done();
    });
  });

  test("Should return Error if user doesn't pass -c or --config argument", (done) => {
    const testApp = spawn('node', ['options.js', '--config']);

    testApp.stderr.on('data', (data) => {
      expect(data.toString()).toBe('Please write config option!');
      done();
    });
  });
  test("Should return Error if user passes -i argument with path that doesn't exist", (done) => {
    const configValue = 'C1';
    const incorrectInputValue = 'inputt.txtx';
    const testApp = spawn('node', ['options.js', '-c', configValue, '-i', incorrectInputValue]);

    testApp.stderr.on('data', (data) => {
      expect(data.toString()).toBe(`File "${incorrectInputValue}" does not exist.\nPlease write correct input value!`);
      done();
    });
  });

  test("Should return Error if user passes  -o argument with path to directory that doesn't exist", (done) => {
    const configValue = 'C1';
    const incorrectOutputValue = 'outptt.txtx';
    const testApp = spawn('node', ['options.js', '-c', configValue, '-o', incorrectOutputValue]);

    testApp.stderr.on('data', (data) => {
      expect(data.toString()).toBe(
        `File "${incorrectOutputValue}" does not exist.\nPlease write correct output value!`
      );
      done();
    });
  });
  test('Should return Error if user passes incorrent symbols in argument for --config', (done) => {
    const incorrectConfigValue = 'C2';
    const testApp = spawn('node', ['options.js', '--config', incorrectConfigValue]);

    testApp.stderr.on('data', (data) => {
      expect(data.toString()).toBe('Please write correct config value!');
      done();
    });
  });
});
