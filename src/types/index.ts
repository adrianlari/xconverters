export type Conversion = {
	type: ConversionTypes;
	input: string;
	result: string;
};

export type DisplayableResult = {
	conversionTypeId: ConversionTypes;
	resultValue: string;
	input: string;
};

export enum ConversionTypes {
	bech32ToHex,
	hexToBech32,
	decimalToHexa,
	hexaToDecimal,
	decimalToBase64,
	base64ToDecimal,
	amountToDenominated,
	denominatedToAmount,
	stringToHexadecimal,
	hexadecimalToString,
	stringToBase64,
	base64ToString,
	hexadecimalToBase64,
	base64ToHexadecimal,
	base64ToHexDecimal,
}

export const converters = [
	{
		label: 'Bech32 → Hex',
		value: ConversionTypes.bech32ToHex,
	},
	{
		label: 'Hex → Bech32',
		value: ConversionTypes.hexToBech32,
	},
	{
		label: 'Decimal → Hex',
		value: ConversionTypes.decimalToHexa,
	},
	{
		label: 'Hex → Decimal',
		value: ConversionTypes.hexaToDecimal,
	},
	{
		label: 'Decimal → Base64',
		value: ConversionTypes.decimalToBase64,
	},
	{
		label: 'Base64 → Decimal',
		value: ConversionTypes.base64ToDecimal,
	},
	{
		label: 'Amount → Denominated',
		value: ConversionTypes.amountToDenominated,
	},
	{
		label: 'Denominated → Amount',
		value: ConversionTypes.denominatedToAmount,
	},
	{
		label: 'String → Hex',
		value: ConversionTypes.stringToHexadecimal,
	},
	{
		label: 'Hex → String',
		value: ConversionTypes.hexadecimalToString,
	},
	{
		label: 'String → Base64',
		value: ConversionTypes.stringToBase64,
	},
	{
		label: 'Base64 → String',
		value: ConversionTypes.base64ToString,
	},
	{
		label: 'Hex → Base64',
		value: ConversionTypes.hexadecimalToBase64,
	},
	{
		label: 'Base64 → Hex',
		value: ConversionTypes.base64ToHexadecimal,
	},
	{
		label: 'Base64 → Hex Decimal',
		value: ConversionTypes.base64ToHexDecimal,
	},
];
