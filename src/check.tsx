import { Base64 } from 'js-base64';

export const bech32Address = (input: string) => {
  if (!input || !input.startsWith("erd1")) {
    return false;
  } else if (input.length !== 62) {
    return false;
  }

  return true;
};

export const hexAddress = (input: string | any[]) => {
  if (input.length !== 64) {
    return false;
  }

  return true;
};

export const decimal = (input: string) => {
  // return input - Math.floor(input) === 0;
  if (
    parseInt(input, 10).toString(10) !== input
  ) {
    return false;
  }

  return true;
};

export const hexadecimal = (input: string) => {
  if (!Boolean(input.match("^[A-Fa-f0-9]+$"))) {
    return false;
  }

  return true;
};

export const base64Value = (input: any) => {
  return base64EncodedString(input);
};

export const amount = (input: number) => {
  return !isNaN(input);
};

export const denominatedAmount = (input: number) => {
  return !isNaN(input);
};

export const stringValue = (input: any) => {
  return true;
  // return Boolean(input.match("^[A-Za-z0-9-]+$"));
};

export const hexaEncodedString = (input: string) => {
  if (!Boolean(input.match("^[A-Fa-f0-9]+$")) || input.length % 2 !== 0) {
    return false;
  }

  return true;
};

export const base64EncodedString = (input: string) => {
  if (
    !Boolean(
      input.match(
        "^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$"
      )
    )
  ) {
    return false;
  }

  return true;
};
