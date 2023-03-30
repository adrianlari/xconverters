import BigNumber from 'bignumber.js';
import { Base64 } from 'js-base64';

const bech32AddressLength = 62;
const hexAddressLength = 64;

export const bech32Address = (input: string) => {
	if (!input || !input.startsWith('erd1') || input.length !== bech32AddressLength) {
		return false;
	}

	return true;
};

export const hexAddress = (input: string) => {
	if (input.length !== hexAddressLength) {
		return false;
	}

	return true;
};

export const decimal = (input: string) => {
	const rs = BigNumber(input);
	if (!rs || !rs.s) return false;

	return true;
};

export const hexadecimal = (input: string) => {
	if (!Boolean(input.match('^[A-Fa-f0-9]+$'))) {
		return false;
	}

	return true;
};

export const base64Value = (input: string) => {
	return base64EncodedString(input);
};

export const amount = (input: BigNumber) => {
	return !isNaN(input.toNumber());
};

export const denominatedAmount = (input: BigNumber) => {
	return !isNaN(input.toNumber());
};

export const stringValue = (input: any) => {
	return true;
};

export const hexaEncodedString = (input: string) => {
	if (!Boolean(input.match('^[A-Fa-f0-9]+$')) || input.length % 2 !== 0) {
		return false;
	}

	return true;
};

export const base64EncodedString = (input: string) => {
	if (!Boolean(input.match('^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$')) && Base64.toBase64(input)) {
		return false;
	}

	return true;
};
