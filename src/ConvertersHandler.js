import React from "react";
import * as checks from "./check";
import { Address, Balance } from "@elrondnetwork/erdjs/out";
import { ConversionTypes } from "./conversionTypes";
import { converters } from "./convertersObjects";
import ResultRow from "./ResultRow";
import Card from "./Card";
import FunctionCard from "./FunctionCard";

const ConvertersHandler = () => {
  const [input, setInput] = React.useState("");
  const [isVisible, setIsVisible] = React.useState(false);

  let indexes = [];
  //const [indexes, setIndexes] = React.useState([]);
  const elRefs = React.useRef([]);
  const textarea = React.useRef();

  const [lastSelected, setLastSelected] = React.useState(-1);
  let inputToGive;

  const [displayableResults, setDisplayableResults] = React.useState([]);

  let [divCounter, setDivCounter] = React.useState(0);

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
    if (!hasOnlyOneDisplayableResult(input)) {
      return (
        <div>
          <details>
            {displayableResults
              .filter((result) => result.input === input)
              .map((result) => {
                if (isBestResult(result, input)) {
                  return (
                    <summary>
                      <div>
                        {convertedItem(
                          result.conversionTypeId,
                          result.resultValue
                        )}
                      </div>
                    </summary>
                  );
                } else {
                  return (
                    <div>
                      {convertedItem(
                        result.conversionTypeId,
                        result.resultValue
                      )}
                    </div>
                  );
                }
              })}
          </details>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            {convertedItem(
              displayableResults[0].conversionTypeId,
              displayableResults[0].resultValue,
              false
            )}
          </div>
        </div>
      );
    }
  };

  const getNextIndex = () => {
    inputToGive = indexes.shift();
    // console.log({ inputToGive });
    return parseInt(inputToGive);
  };

  const populateIndexesArray = (inputArrayLength) => {
    for (let i = 0; i < inputArrayLength; i++) {
      indexes.push(i);
    }
  };

  const populateRefs = () => {
    if (elRefs.current.length !== indexes.length) {
      elRefs.current = Array(indexes.length)
        .fill()
        .map((_, i) => elRefs.current[i] || React.createRef());
    }
  };

  const displayConversion = () => {
    const inputArray = input.split("@");

    if (!inputArray) return;

    populateIndexesArray(inputArray.length);

    populateRefs();

    if (inputArray.length === 1) {
      convertWord(inputArray[0]);
      return displayBlock(inputArray[0]);
    } else {
      const index = getNextIndex();
      // console.log({ index });
      return (
        <div>
          <div ref={elRefs.current[index]}>
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
  // <div>
  //   <div>
  //     <div
  //       style={{ marginTop: "2%" }}
  //       ref={elRefs.current[getNextIndex()]}
  //     >
  //       <div className="container page-content">
  //         <div className="row">
  //           <div className="col-9" style={{ marginLeft: "12.5%" }}>
  //             <div className="transaction-info card">
  //               <div
  //                 className="card-header status-text-success"
  //                 style={{ backgroundColor: "transparent" }}
  //               >
  //                 <div className="card-header-item d-flex align-items-center">
  //                   <span>The function is: {inputArray[0]}</span>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>

  const hover = (index) => {
    if (lastSelected !== -1 && elRefs && elRefs.current[lastSelected])
      elRefs.current[lastSelected].current.style.backgroundColor =
        "transparent";

    const text = input.split("@")[index];
    const startingPos = input.indexOf(text);

    // console.log({ index });
    // console.log({ lastSelected });
    elRefs.current[index].current.style.backgroundColor = "#242526";
    elRefs.current[index].current.style.borderRadius = "10px";

    setLastSelected(index);
    textarea.current.setSelectionRange(startingPos, startingPos + text.length);
    textarea.current.focus();
    // console.log({ textarea });
    // textarea.current.value = textarea.current.textContent.replace(
    //   pattern,
    //   (match) => `<mark style={{backgroundColor: "red"}}>${match}</mark>`
    // );
    // console.log("from parent " + index);
  };

  // const blur = () => {
  //   console.log("blur parent");
  // };

  const displayBlock = (word) => {
    if (!word || hasNoDisplayableResults(word)) return;

    const index = getNextIndex();
    // console.log(displayPossibleResults(word));
    return (
      <div ref={elRefs.current[index]}>
        <Card
          hover={(index) => hover(index)}
          index={index}
          word={word}
          results={displayPossibleResults(word)}
        />
      </div>
      // <div
      //   style={{ marginTop: "2%" }}
      //   ref={elRefs.current[getNextIndex()]}
      //   onClick={(event) => selectTextCorrespondingly(event)}
      //   key={divCounter++}
      // >
      //   <div className="container page-content">
      //     <div className="row">
      //       <div className="col-9" style={{ marginLeft: "12.5%" }}>
      //         <div className="transaction-info card">
      //           <div
      //             className="card-header status-text-success"
      //             style={{ backgroundColor: "transparent" }}
      //           >
      //             <div className="card-header-item d-flex align-items-center">
      //               <span>Possible Conversions for {word}</span>
      //             </div>
      //           </div>
      //           <div className="card-body p-0">
      //             <div className="container-fluid">
      //               <div className="tab-content">
      //                 <div
      //                   id="transaction-tabs-tabpane-details"
      //                   aria-labelledby="transaction-tabs-tab-details"
      //                   role="tabpanel"
      //                   aria-hidden="false"
      //                   className="fade tab-pane active show"
      //                 >
      //                   <div>{displayPossibleResults(word)}</div>
      //                 </div>
      //               </div>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  };

  // const selectTextCorrespondingly = (event) => {
  //   console.log(event.target);
  // };

  const highlightCard = () => {
    if (lastSelected !== -1 && elRefs && elRefs.current[lastSelected])
      elRefs.current[lastSelected].current.style.backgroundColor =
        "transparent";

    if (document.activeElement.tagName === "TEXTAREA") {
      const text = window.getSelection().toString();

      if (text.length > 0) {
        //alert(text);
        const startIndex = document.activeElement.selectionStart; //.indexOf(text);

        const inputArray = input.split("@");

        if (!inputArray) return;

        const arrayIndex = input.substr(0, startIndex).split("@").length - 1;
        // console.log({ startIndex });

        // console.log(elRefs.current[arrayIndex]);

        elRefs.current[arrayIndex].current.style.backgroundColor = "#242526";
        elRefs.current[arrayIndex].current.style.borderRadius = "10px";
        setLastSelected(arrayIndex);
      }
    }
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

  const convertedItem = (conversionTypeId, result) => {
    let label = converters.filter((pair) => pair.value === conversionTypeId)[0]
      .label;

    if (!result) return "";

    return (
      <div key={divCounter++}>
        <ResultRow label={label} result={result} key={divCounter++} />
      </div>
    );
  };

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
      } catch {}

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
      } catch {}

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

  // document.body.onDoubleClick = highlightCard();

  return (
    <div
      // onClick={(event) => {
      //   console.log(event.target.index);
      //   console.log("clicked");
      // }}
      onMouseUp={() => highlightCard()}
      onDoubleClick={() => highlightCard()}
    >
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
                <div className="input-group ">
                  <textarea
                    id="blabla"
                    ref={textarea}
                    // onSelect={highlightCard()}
                    rows="3"
                    value={input}
                    style={{ borderRadius: "20px" }}
                    className="form-control border-0 py-3 pl-1 pl-lg-4"
                    placeholder="Insert a value to be converted."
                    onChange={(event) => {
                      setInput(event.target.value);
                      setDisplayableResults([]);
                      setDivCounter(0);

                      if (event.target.value) {
                        setIsVisible(true);
                      } else {
                        setIsVisible(false);
                      }
                    }}
                  />
                  <button
                    style={{ borderRadius: "20px" }}
                    className="btn btn-outline-light btn-lg mr-2 "
                    onClick={() => setInput("")}
                  >
                    Clear input
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div style={{ display: isVisible ? "inline" : "none" }}>
            <div>{displayConversion()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConvertersHandler;
