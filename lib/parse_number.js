function parseNumber(input) {
  var value;

  if ('number' == typeof input) {
    return value = input;
  }

  if ('string' == typeof input) {
    input = input.toLowerCase();
    if (0 === input.indexOf('0x')) {
      value = parseInt(input.substr(2), 16);
    } else if (0 === input.indexOf('0b')) {
      value = parseInt(input.substr(2), 2);
    } else {
      value = parseInt(input, 10);
    }
    return value;
  }

  return NaN;
}
exports.parseNumber = parseNumber;
