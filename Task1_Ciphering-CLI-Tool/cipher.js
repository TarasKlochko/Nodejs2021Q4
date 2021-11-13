const engUpCaseCharCodeStart = 65;
const engUpCaseCharCodeEnd = 90;
const engLowCaseCharCodeStart = 97;
const engLowCaseCharCodeEnd = 122;
const engAlphabetLength = 26;

function getNewChar(char, shift, encrypt, atbash) {
  let charCode = char.charCodeAt();
  let isEngUpCase = charCode >= engUpCaseCharCodeStart && charCode <= engUpCaseCharCodeEnd;
  let isEngLowCase = charCode >= engLowCaseCharCodeStart && charCode <= engLowCaseCharCodeEnd;

  if (isEngLowCase) {
    let newCharCode = '';
    if (atbash) {
      newCharCode = engLowCaseCharCodeEnd - (charCode - engLowCaseCharCodeStart);
    }
    if (!atbash && encrypt) {
      newCharCode =
        ((charCode - engLowCaseCharCodeStart + shift + engAlphabetLength) % engAlphabetLength) +
        engLowCaseCharCodeStart;
    }
    if (!atbash && !encrypt) {
      newCharCode =
        ((charCode - engLowCaseCharCodeStart - shift + engAlphabetLength) % engAlphabetLength) +
        engLowCaseCharCodeStart;
    }
    return String.fromCharCode(newCharCode);
  }
  if (isEngUpCase) {
    let newCharCode = '';
    if (atbash) {
      newCharCode = engUpCaseCharCodeEnd - (charCode - engUpCaseCharCodeStart);
    }
    if (!atbash && encrypt) {
      newCharCode =
        ((charCode - engUpCaseCharCodeStart + shift + engAlphabetLength) % engAlphabetLength) + engUpCaseCharCodeStart;
    }
    if (!atbash && !encrypt) {
      newCharCode =
        ((charCode - engUpCaseCharCodeStart - shift + engAlphabetLength) % engAlphabetLength) + engUpCaseCharCodeStart;
    }
    return String.fromCharCode(newCharCode);
  }
  return char;
}

function cipher(input, shift, encrypt, atbash = 0) {
  let newInput = input.split('').map((char) => getNewChar(char, shift, encrypt, atbash));
  return newInput.join('');
}

cipher('MNmn', 0, 0, 1);
