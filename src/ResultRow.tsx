import React from "react";
import * as checks from "./check";
import { Balance } from "@elrondnetwork/erdjs/out";

interface ResultRowParams {
  label: string;
  result: string;
}

const ResultRow = ({ label, result }: ResultRowParams) => {
  const copyToCliboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const displayDenominationIfNeeded = () => {
    if (
      String(label).endsWith("Decimal") &&
      checks.decimal(result) &&
      String(result).length > 12
    ) {
      const denomination = Balance.fromString(result).toCurrencyString();

      return (
        <div
          style={{
            display: denomination !== "" ? "block" : "none",
            position: "absolute",
            top: "15px",
            left: "15px",
            color: "GrayText",
          }}
        >
          {denomination}
        </div>
      );
    }
  };

  return (
    <div>
      <div className="row py-3 border-bottom detail-item">
        <div className="col-lg-3 text-secondary text-lg-right pl-lg-spacer">
          {label}
        </div>
        <div className="col pr-lg-spacer">
          <div className="d-flex align-items-center text-break-all">
            {result}
            <div>{displayDenominationIfNeeded()}</div>
            {/* eslint-disable-next-line*/}
            <a onClick={() => copyToCliboard(result)} className="side-action ">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="check"
                className="svg-inline--fa fa-clone fa-w-16 "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M464 0H144c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h320c26.51 0 48-21.49 48-48v-48h48c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48zM362 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h42v224c0 26.51 21.49 48 48 48h224v42a6 6 0 0 1-6 6zm96-96H150a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h308a6 6 0 0 1 6 6v308a6 6 0 0 1-6 6z"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultRow;
