export const bech32Address = (input) => {
  if (!input || !input.startsWith("erd1")) {
    return false;
  } else if (input.length !== 62) {
    return false;
  }

  return true;
};

export const hexAddress = (input) => {
  if (input.length !== 64) {
    return false;
  }

  return true;
};

export const decimal = (input) => {
  if (
    parseInt(input, 10).toString(10) !== input &&
    parseInt(input, 10) !== input
  ) {
    return false;
  }

  return true;
};

export const hexadecimal = (input) => {
  if (
    parseInt(input, 16).toString(16) !== input &&
    parseInt(input, 16) !== input
  ) {
    return false;
  }

  return true;
};

export const base64Value = (input) => {
  return true;
};

export const amount = (input) => {
  return !isNaN(input);
};

export const denominatedAmount = (input) => {
  return !isNaN(input);
};

export const stringValue = (input) => {
  if (input.toString() !== input) {
    return false;
  }

  return true;
};

export const hexaEncodedString = (input) => {
  return input.length % 2 === 0;
};

export const base64EncodedString = (input) => {
  return true;
};
