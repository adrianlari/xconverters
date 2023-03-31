import { Address } from '@elrondnetwork/erdjs/out/address';
import BigNumber from 'bignumber.js';
import { Base64 } from 'js-base64';

export const bech32AddressLength = 62;
export const hexAddressLength = 64;

export const bech32Address = (input: string) => {
	try {
		new Address(input).bech32();
	} catch {
		return false;
	}

	return true;
};

export const hexAddress = (input: string) => {
	try {
		new Address(input).bech32();
	} catch {
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
