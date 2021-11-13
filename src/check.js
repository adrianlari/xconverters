export const bech32Address = (input) => {
  if (!input || !input.startsWith("erd1")) {
    errorMessage = "Address is invalid.";
    return false;
  } else if (input.length !== 62) {
    errorMessage = "Address has invalid length.";
    return false;
  }

  return true;
};

export const hexAddress = (input) => {
  if (input.length !== 64) {
    errorMessage = "Address has invalid length.";
    return false;
  }

  return true;
};

export const decimal = (input) => {
  if (parseInt(input, 10).toString(10) !== input) {
    errorMessage = "Invalid numeric value.";
    return false;
  }

  return true;
};

export const hexadecimal = (input) => {
  if (parseInt(input, 16).toString(16) !== input) {
    errorMessage = "Invalid hex value.";
    return false;
  }

  return true;
};

export const base64Value = (input) => {
  return true;
};

export const amount = (input) => {
  return true;
};

export const denominatedAmount = (input) => {
  return true;
};

export const stringValue = (input) => {
  return true;
};

export const hexaEncodedString = (input) => {
  return input.length % 2 === 0;
};

export const base64EncodedString = (input) => {
  return true;
};

export let errorMessage = "";
