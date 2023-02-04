import { createRef, Key, MutableRefObject, useRef, useState } from 'react';
import Card from './Components/Card';
import FunctionCard from './Components/FunctionCard';
import ConvertedRow from './Components/ConvertedRow';
import * as tryConvert from './tryConverts';
import { conversion } from './conversion';
import BigNumber from 'bignumber.js';

const ConvertersHandler = () => {
	const [input, setInput] = useState('');
	const [isVisible, setIsVisible] = useState(false);
	const [lastSelected, setLastSelected] = useState(-1);
	const [displayableResults, setDisplayableResults] = useState<any>([]);
	const textarea = useRef() as MutableRefObject<HTMLTextAreaElement>;
	const cardsRefs = useRef<any>([]);
	const [isSingleMode, setIsSingleMode] = useState(false);

	const TRANSACTION_SEPARATOR = '@';

	let indexes: number[] = [];

	function* idMaker() {
		let index = 0;
		while (true) {
			yield index++;
		}
	}

	const gen = idMaker();

	const isBestResult = (result: any, input: any) => {
		return (
			displayableResults.filter((res: any) => res.input === input)[0] === result
		);
	};

	const hasOnlyOneDisplayableResult = (input: any) => {
		return (
			displayableResults.filter((result: any) => result.input === input)
				.length === 1
		);
	};

	const hasNoDisplayableResults = (input: any) => {
		return (
			displayableResults.filter((result: any) => result.input === input)
				.length === 0
		);
	};

	const displayPossibleResults = (input: string) => {
		if (isSingleMode) {
			return (
				<div>
					{displayableResults
						.filter((result: { input: string }) => result.input === input)
						.map(
							(result: { conversionTypeId: number; resultValue: string }) => {
								return (
									<ConvertedRow
										conversionTypeId={result.conversionTypeId}
										result={result.resultValue}
										key={gen.next().value as number}
									/>
								);
							}
						)}
				</div>
			);
		}

		if (!hasOnlyOneDisplayableResult(input)) {
			return (
				<div key={gen.next().value as number}>
					<details>
						{displayableResults
							.filter(
								(result: { input: Key | null | undefined }) =>
									result.input === input
							)
							.map(
								(result: { conversionTypeId: number; resultValue: string }) => {
									if (isBestResult(result, input)) {
										return (
											<summary>
												<ConvertedRow
													conversionTypeId={result.conversionTypeId}
													result={result.resultValue}
												/>
											</summary>
										);
									} else {
										return (
											<ConvertedRow
												conversionTypeId={result.conversionTypeId}
												result={result.resultValue}
											/>
										);
									}
								}
							)}
					</details>
				</div>
			);
		} else {
			return (
				<ConvertedRow
					conversionTypeId={displayableResults[0].conversionTypeId}
					result={displayableResults[0].resultValue}
				/>
			);
		}
	};

	const getNextIndex = () => {
		return indexes.shift() || 0;
	};

	const populateIndexesArray = (inputArrayLength: number) => {
		for (let i = 0; i < inputArrayLength; i++) {
			indexes.push(i);
		}
	};

	const populateRefs = () => {
		if (cardsRefs.current.length !== indexes.length) {
			cardsRefs.current = Array(indexes.length)
				.fill(null)
				.map((_, i) => cardsRefs.current[i] || createRef());
		}
	};

	const displayConversion = () => {
		if (!input) return;

		const inputArray = input.split(TRANSACTION_SEPARATOR);

		if (!inputArray) return;

		populateIndexesArray(inputArray.length);

		populateRefs();

		if (isSingleMode) {
			convertWord(inputArray[0]);

			return displayBlock(inputArray[0]);
		} else {
			const index = getNextIndex();

			return (
				<>
					<div ref={cardsRefs.current[index]}>
						<FunctionCard
							hover={(index: any) => hover(index)}
							index={index}
							word={inputArray[0]}
						/>
					</div>

					{inputArray.map((word) => {
						//convertWord(word);
						hexConversions(word);

						return displayBlock(word);
					})}
				</>
			);
		}
	};

	const displayBlock = (word: string) => {
		if (!word || hasNoDisplayableResults(word)) return;

		const index = getNextIndex();

		return (
			<div
				ref={cardsRefs.current[index]}
				key={index}>
				<Card
					hover={(index) => hover(index)}
					index={index}
					word={word}
					results={displayPossibleResults(word)}
				/>
			</div>
		);
	};

	const unSelectPrevious = () => {
		if (
			lastSelected !== -1 &&
			cardsRefs &&
			cardsRefs.current[lastSelected] &&
			cardsRefs.current[lastSelected].current
		) {
			const lastSelectedCardRef = cardsRefs.current[lastSelected];
			const lastSelectedCard = lastSelectedCardRef.current;

			lastSelectedCard.style.backgroundColor = 'transparent';
		}
	};

	const highlightCard = () => {
		unSelectPrevious();

		if (isSingleMode) return;
		if (
			!document ||
			!document.activeElement ||
			document.activeElement.tagName !== 'TEXTAREA'
		)
			return;
		if (!window || !window.getSelection()) return;

		const text = window.getSelection()?.toString();
		if (!text) return;

		if (text.length > 0) {
			const startIndex =
				(document.activeElement as HTMLInputElement).selectionStart || 0;
			const inputArray = input.split(TRANSACTION_SEPARATOR);

			if (!inputArray) return;

			const arrayIndex =
				input.substr(0, startIndex).split(TRANSACTION_SEPARATOR).length - 1;

			selectCard(arrayIndex);

			setLastSelected(arrayIndex);
		}
	};

	const selectCard = (index: number) => {
		if (
			!cardsRefs ||
			!cardsRefs.current[index] ||
			!cardsRefs.current[index].current
		)
			return;

		cardsRefs.current[index].current.style.backgroundColor = '#242526';
		cardsRefs.current[index].current.style.borderRadius = '10px';
	};

	const hover = (index: number) => {
		unSelectPrevious();

		if (isSingleMode || !input) return;

		const textToSelect = input.split(TRANSACTION_SEPARATOR)[index];
		if (!textToSelect) return;

		const startingPos = input.indexOf(textToSelect);
		if (startingPos < 0) return;
		if (!textarea || !textarea.current) return;

		selectCard(index);
		setLastSelected(index);
		textarea.current.setSelectionRange(
			startingPos,
			startingPos + textToSelect.length
		);
		textarea.current.focus();
	};

	const addToDisplayableResults = (conversion: conversion | undefined) => {
		if (!conversion || !conversion.input || !conversion.result) return;

		if (
			displayableResults.some(
				(displayableResult: { conversionTypeId: any }) =>
					displayableResult.conversionTypeId === conversion.type
			)
		) {
			return;
		}

		setDisplayableResults((oldArray: any) => [
			...oldArray,
			{
				conversionTypeId: conversion.type,
				resultValue: conversion.result,
				input: conversion.input,
			},
		]);
	};

	const hexConversions = (hexInput: string) => {
		if (!hexInput) return;

		let conversion: conversion | undefined;
		conversion = tryConvert.hexToBech32(hexInput);
		addToDisplayableResults(conversion);

		conversion = tryConvert.hexToString(hexInput);
		addToDisplayableResults(conversion);

		conversion = tryConvert.hexToDecimal(hexInput);
		addToDisplayableResults(conversion);

		conversion = tryConvert.hexToBase64(hexInput);
		addToDisplayableResults(conversion);
	};

	const convertWord = (input: string) => {
		if (!input) return;
		let conversion;

		conversion = tryConvert.bech32ToHex(input);
		addToDisplayableResults(conversion);

		conversion = tryConvert.hexToBech32(input);
		addToDisplayableResults(conversion);

		conversion = tryConvert.decimalToHex(input);
		addToDisplayableResults(conversion);

		conversion = tryConvert.hexToDecimal(input);
		addToDisplayableResults(conversion);

		conversion = tryConvert.decimalToBase64(input);
		addToDisplayableResults(conversion);

		conversion = tryConvert.base64ToDecimal(input);
		addToDisplayableResults(conversion);

		conversion = tryConvert.amountToDenominate(BigNumber(input));
		addToDisplayableResults(conversion);

		conversion = tryConvert.denominatedToAmount(BigNumber(input));
		addToDisplayableResults(conversion);

		conversion = tryConvert.stringToHex(input);
		addToDisplayableResults(conversion);

		conversion = tryConvert.hexToString(input);
		addToDisplayableResults(conversion);

		conversion = tryConvert.stringToBase64(input);
		addToDisplayableResults(conversion);

		conversion = tryConvert.base64ToString(input);
		addToDisplayableResults(conversion);

		conversion = tryConvert.hexToBase64(input);
		addToDisplayableResults(conversion);

		conversion = tryConvert.base64ToHex(input);
		addToDisplayableResults(conversion);

		conversion = tryConvert.base64ToHexDecimal(input);
		addToDisplayableResults(conversion);
	};

	const clearInput = () => {
		setInput('');
		if (!textarea || !textarea.current) return;

		textarea.current.focus();
		textarea.current.style.height = '45px';
	};

	const resizeTextarea = () => {
		if (!textarea || !textarea.current) return;

		textarea.current.style.height = '5px';
		textarea.current.style.height = textarea.current.scrollHeight + 'px';
	};

	return (
		<>
			<div className="main-search-container py-spacer">
				<div className="container py-3">
					<div className="row">
						<div className="col-12 text-center">
							<h1 className="mb-4">
								<a
									style={{ color: 'inherit' }}
									href="https://xconverters.netlify.app/">
									XConverters
								</a>
							</h1>
						</div>
					</div>
					<div className="row">
						<div className="col-12 col-lg-9 mx-auto">
							<form className="main-search w-100 d-flex">
								<div className="input-group">
									<textarea
										onDoubleClick={() => highlightCard()}
										onMouseUp={() => {
											highlightCard();
										}}
										autoComplete="off"
										id="input-text"
										ref={textarea}
										value={input}
										rows={1}
										style={{
											resize: 'none',
											borderRadius: '1.25rem',
											overflowX: 'hidden',
										}}
										className="form-control border-0 py-3 pl-1 pl-lg-4"
										placeholder="Insert a value to be converted."
										onChange={(event) => {
											setInput(event.target.value);
											setIsSingleMode(
												event.target.value.split(TRANSACTION_SEPARATOR)
													.length === 1
											);
											setDisplayableResults([]);
											setIsVisible(event.target.value !== null);
											resizeTextarea();
										}}
									/>
								</div>
								<div
									className="clear-input"
									onClick={() => clearInput()}
									style={{
										display: input ? 'inline' : 'none',
										position: 'absolute',
										zIndex: '100',
										cursor: 'pointer',
									}}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="#808080">
										<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
									</svg>
								</div>
							</form>
						</div>
					</div>
					<div
						className="row"
						style={{ display: isVisible ? 'block' : 'none' }}>
						<div>{input && displayConversion()}</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ConvertersHandler;
