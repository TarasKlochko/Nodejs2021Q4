# Instruction

To start the program please enter "node index.js" with next options with a space:

1.  **-c, --config**: config for ciphers
    Config is a string with pattern `{XY(-)}n`, where:

- `X` is a cipher mark:
  - `C` is for Caesar cipher (with shift 1)
  - `A` is for Atbash cipher
  - `R` is for ROT-8 cipher
- `Y` is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
  - `1` is for encoding
  - `0` is for decoding

2.  **-i, --input**: a path to input file
3.  **-o, --output**: a path to output file

First option (-c or --config) is **`required`**.

The order of options does not matter.

If you do not use otions 2 and 3, the text will be entered and displayed via the command line

# Examples

- node index.js -c "A-R1-C1-C1-A" -i "./input.txt" -o "./output.txt"
- node index.js --config "C1-C1-A-R1" --input "./input.txt" --output "./output.txt"
