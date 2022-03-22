import React from "react";
import * as checks from "./check";
import { Address, Balance } from "@elrondnetwork/erdjs/out";
import { ConversionTypes } from "./conversionTypes";
import Card from "./Components/Card";
import FunctionCard from "./Components/FunctionCard";
import ConvertedRow from "./Components/ConvertedRow";

const ConvertersHandler = () => {
  const [input, setInput] = React.useState("");
  const [isVisible, setIsVisible] = React.useState(false);
  const [lastSelected, setLastSelected] = React.useState(-1);
  const [displayableResults, setDisplayableResults] = React.useState([]);
  const textarea = React.useRef();
  const cardsRefs = React.useRef([]);
  const [isSingleMode, setIsSingleMode] = React.useState(false);

  // const [isMouseDown, setIsMouseDown] = React.useState(false);

  let indexes = [];
  //const [indexes, setIndexes] = React.useState([]);
  // let [divCounter, setDivCounter] = React.useState(0);

  const isBestResult = (result, input) => {
    return (
      displayableResults.filter((res) => res.input === input)[0] === result
    );
  };

  const hasOnlyOneDisplayableResult = (input) => {
    return (
      displayableResults.filter((result) => result.input === input).length === 1
    );
  };

  const hasNoDisplayableResults = (input) => {
    return (
      displayableResults.filter((result) => result.input === input).length === 0
    );
  };

  const displayPossibleResults = (input) => {
    if (isSingleMode) {
      return (
        <div>
          {displayableResults
            .filter((result) => result.input === input)
            .map((result) => {
              return (
                <ConvertedRow
                  conversionTypeId={result.conversionTypeId}
                  result={result.resultValue}
                />
              );
            })}
        </div>
      )
    }

    if (!hasOnlyOneDisplayableResult(input)) {
      return (
        <div key={input}>
          <details>
            {displayableResults
              .filter((result) => result.input === input)
              .map((result) => {
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
              })}
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
    return parseInt(indexes.shift());
  };

  const populateIndexesArray = (inputArrayLength) => {
    for (let i = 0; i < inputArrayLength; i++) {
      indexes.push(i);
    }
  };

  const populateRefs = () => {
    if (cardsRefs.current.length !== indexes.length) {
      cardsRefs.current = Array(indexes.length)
        .fill()
        .map((_, i) => cardsRefs.current[i] || React.createRef());
    }
  };

  const displayConversion = () => {
    if (!input) return;

    const inputArray = input.split("@");

    if (!inputArray) return;

    populateIndexesArray(inputArray.length);

    populateRefs();

    if (isSingleMode) {
      convertWord(inputArray[0]);

      return displayBlock(inputArray[0]);
    } else {
      const index = getNextIndex();
      // console.log({ index });
      return (
        <div>
          <div ref={cardsRefs.current[index]}>
            <FunctionCard
              hover={(index) => hover(index)}
              index={index}
              word={inputArray[0]}
            />
          </div>

          {inputArray.map((word) => {
            //convertWord(word);
            hexConversions(word);

            return displayBlock(word);
          })}
        </div>
        // </div>
      );
    }
  };

  const displayBlock = (word) => {
    if (!word || hasNoDisplayableResults(word)) return;

    const index = getNextIndex();

    return (
      <div ref={cardsRefs.current[index]} key={index}>
        <Card
          hover={(index) => hover(index)}
          index={index}
          word={word}
          results={displayPossibleResults(word)}
        />
      </div>
    );
  };

  const unselectPrevious = () => {
    if (lastSelected !== -1 && cardsRefs && cardsRefs.current[lastSelected] && cardsRefs.current[lastSelected].current) {

      const lastSelectedCardRef = cardsRefs.current[lastSelected];
      const lastSelectedCard = lastSelectedCardRef.current;

      lastSelectedCard.style.backgroundColor = "transparent";
    }
  }

  const highlightCard = () => {
    unselectPrevious();

    if (isSingleMode) return;
    // if (isMouseDown) return;

    console.log("highlight card");

    if (document.activeElement.tagName === "TEXTAREA") {
      const text = window.getSelection().toString();

      if (text.length > 0) {
        const startIndex = document.activeElement.selectionStart; //.indexOf(text);

        const inputArray = input.split("@");

        if (!inputArray) return;

        const arrayIndex = input.substr(0, startIndex).split("@").length - 1;

        selectCard(arrayIndex);

        setLastSelected(arrayIndex);
      }
    }
  };

  const selectCard = (index) => {
    if (!cardsRefs || !cardsRefs.current[index] || !cardsRefs.current[index].current) return;

    cardsRefs.current[index].current.style.backgroundColor = "#242526";
    cardsRefs.current[index].current.style.borderRadius = "10px";
  }

  const hover = (index) => {
    unselectPrevious();

    if (isSingleMode) return;
    // if (isMouseDown) return;
    if (!input) return;

    const textToSelect = input.split("@")[index];
    const startingPos = input.indexOf(textToSelect);

    selectCard(index);

    setLastSelected(index);
    textarea.current.setSelectionRange(startingPos, startingPos + textToSelect.length);
    textarea.current.focus();
  };

  const addToDisplayableResults = (conversionTypeId, resultValue, input) => {
    if (
      displayableResults.some(
        (displayableResult) =>
          displayableResult.conversionTypeId === conversionTypeId
      )
    ) {
      return;
    }

    setDisplayableResults((oldArray) => [
      ...oldArray,
      {
        conversionTypeId: conversionTypeId,
        resultValue: resultValue,
        input: input,
      },
    ]);
  };

  const hexConversions = (hexInput) => {
    if (!hexInput) {
      return;
    }

    tryConvertHexToBech32(hexInput);

    tryConvertHexToString(hexInput);

    tryConvertHexToDecimal(hexInput);

    tryConvertHexToBase64(hexInput);
  };

  const convertWord = (input) => {
    if (!input) {
      return;
    }

    tryConvertBech32ToHex(input);

    tryConvertHexToBech32(input);

    tryConvertDecimalToHex(input);

    tryConvertHexToDecimal(input);

    tryConvertDecimalToBase64(input);

    tryConvertBase64ToDecimal(input);

    tryConvertAmountToDemoninate(input);

    tryConvertDenominatedToAmount(input);

    tryConvertStringToHex(input);

    tryConvertHexToString(input);

    tryConvertStringToBase64(input);

    tryConvertBase64ToString(input);

    tryConvertHexToBase64(input);

    tryConvertBase64ToHex(input);

    tryConvertBase64ToHexDecimal(input);
  };

  const clearInput = () => {
    setInput("");
    textarea.current.focus();
    textarea.current.style.height = "45px";
  }

  //#region TryConverts

  const tryConvertHexToDecimal = (input) => {
    if (checks.hexadecimal(input)) {
      const result = parseInt(input, 16);

      if (checks.decimal(result)) {
        addToDisplayableResults(ConversionTypes.hexaToDecimal, result, input);
      }
    }
  };

  const tryConvertDecimalToHex = (input) => {
    if (checks.decimal(input)) {
      let result = parseInt(input, 10).toString(16);

      if (result.length % 2 === 1) {
        result = "0" + result;
      }

      if (checks.hexadecimal(result)) {
        addToDisplayableResults(ConversionTypes.decimalToHexa, result, input);
      }
    }
  };

  const tryConvertHexToBech32 = (input) => {
    if (checks.hexAddress(input)) {
      let result;
      try {
        result = new Address(input).bech32();
      } catch { }

      if (result) {
        addToDisplayableResults(ConversionTypes.hexToBech32, result, input);
      }
    }
  };

  const tryConvertBech32ToHex = (input) => {
    if (checks.bech32Address(input)) {
      let result;
      try {
        result = new Address(input).hex();
      } catch { }

      if (result) {
        addToDisplayableResults(ConversionTypes.bech32ToHex, result, input);
      }
    }
  };

  const tryConvertBase64ToHex = (input) => {
    if (checks.base64EncodedString(input)) {
      const result = Buffer.from(input, "base64").toString("hex");

      addToDisplayableResults(
        ConversionTypes.base64ToHexadecimal,
        result,
        input
      );
    }
  };

  const tryConvertHexToBase64 = (input) => {
    if (checks.hexaEncodedString(input)) {
      const result = Buffer.from(input, "hex").toString("base64");

      addToDisplayableResults(
        ConversionTypes.hexadecimalToBase64,
        result,
        input
      );
    }
  };

  const tryConvertBase64ToString = (input) => {
    if (checks.base64EncodedString(input)) {
      const result = Buffer.from(input, "base64").toString("ascii");

      if (checks.stringValue(result)) {
        addToDisplayableResults(ConversionTypes.base64ToString, result, input);
      }
    }
  };

  const tryConvertStringToBase64 = (input) => {
    if (checks.stringValue(input)) {
      const result = Buffer.from(input, "ascii").toString("base64");

      addToDisplayableResults(ConversionTypes.stringToBase64, result, input);
    }
  };

  const tryConvertHexToString = (input) => {
    if (checks.hexaEncodedString(input)) {
      const result = Buffer.from(input, "hex").toString("utf8");

      if (checks.stringValue(result)) {
        addToDisplayableResults(
          ConversionTypes.hexadecimalToString,
          result,
          input
        );
      }
    }
  };

  const tryConvertStringToHex = (input) => {
    if (checks.stringValue(input)) {
      const result = Buffer.from(input, "ascii").toString("hex");

      if (checks.hexadecimal(result)) {
        addToDisplayableResults(
          ConversionTypes.stringToHexadecimal,
          result,
          input
        );
      }
    }
  };

  const tryConvertDenominatedToAmount = (input) => {
    if (checks.denominatedAmount(input)) {
      const result = Balance.fromString(input).toCurrencyString();

      addToDisplayableResults(
        ConversionTypes.denominatedToAmount,
        result,
        input
      );
    }
  };

  const tryConvertAmountToDemoninate = (input) => {
    if (checks.amount(input)) {
      const result = Balance.egld(input).toString();

      addToDisplayableResults(
        ConversionTypes.amountToDenominated,
        result,
        input
      );
    }
  };

  const tryConvertBase64ToDecimal = (input) => {
    if (checks.base64Value(input)) {
      const result = Buffer.from(input, "base64").toString("ascii");

      if (checks.decimal(result)) {
        addToDisplayableResults(ConversionTypes.base64ToDecimal, result, input);
      }
    }
  };

  const tryConvertDecimalToBase64 = (input) => {
    if (checks.decimal(input)) {
      const result = Buffer.from(input, "ascii").toString("base64");

      if (checks.base64Value(result)) {
        addToDisplayableResults(ConversionTypes.decimalToBase64, result, input);
      }
    }
  };

  const tryConvertBase64ToHexDecimal = (input) => {
    if (checks.base64EncodedString(input)) {
      const result1 = Buffer.from(input, "base64").toString("hex");

      if (checks.hexadecimal(result1)) {
        const result2 = parseInt(result1, 16);

        if (checks.decimal(result2)) {
          addToDisplayableResults(
            ConversionTypes.base64ToHexDecimal,
            result2,
            input
          );
        }
      }
    }
  };
  //#endregion

  const resizeTextarea = () => {
    textarea.current.style.height = "5px"
    textarea.current.style.height = (textarea.current.scrollHeight) + "px";
  }

  return (
    <div>
      <div className="main-search-container py-spacer">
        <div className="container py-3">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="mb-4">
                <a
                  style={{ color: "inherit" }}
                  href="https://elrond-converters.netlify.app/"
                >
                  Elrond Converters
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
                      highlightCard()
                    }}
                    autoComplete="off"
                    id="input-text"
                    ref={textarea}
                    value={input}
                    rows="1"
                    style={{
                      resize: "none",
                      borderRadius: "20px",
                      resizeBy: "none",
                      overflowX: "hidden",
                      // maxHeight: "100px",
                      width: "100%"
                    }}
                    className="form-control border-0 py-3 pl-1 pl-lg-4"
                    placeholder="Insert a value to be converted."
                    onChange={(event) => {

                      setInput(event.target.value);
                      setIsSingleMode(event.target.value.split('@').length === 1)
                      setDisplayableResults([]);
                      setIsVisible(event.target.value !== null)
                      resizeTextarea();
                    }}
                  />
                </div>
                <div className="clear-input" onClick={() => clearInput()} style={{
                  display: input ? "inline" : "none", position: "absolute", zIndex: "100", cursor: "pointer"
                }}>
                  < svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='#808080' >
                    <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
                  </svg>
                </div>
              </form>
            </div>
          </div>
          <div style={{ display: isVisible ? "inline" : "none" }}>
            <div>{displayConversion()}</div>
          </div>
        </div>
      </div >
    </div >
  );
};

export default ConvertersHandler;
