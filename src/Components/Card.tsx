import React from "react";

interface CardParams {
  index: number;
  results: React.Component;
  word: string;
  hover: (index: number) => void
}

export const Card = ({ index, results, word, hover }: CardParams) => {
  // const [backColor, setBackColor] = React.useState("");

  return (
    <div
      onMouseEnter={() => {
        hover(index);
      }}
      style={{ marginTop: "2%" }}
      key={index}
    >
      <div className="container page-content">
        <div className="row">
          <div className="col-9" style={{ marginLeft: "12.5%" }}>
            <div className="transaction-info card">
              <div
                className="card-header status-text-success"
                style={{
                  backgroundColor: "transparent",
                }}
              >
                <div className="card-header-item d-flex align-items-center">
                  <span>Possible Conversions for {word}</span>
                </div>
              </div>
              <div
                className="card-body p-0"
              >
                <div className="container-fluid">
                  <div className="tab-content">
                    <div
                      id="transaction-tabs-tabpane-details"
                      aria-labelledby="transaction-tabs-tab-details"
                      role="tabpanel"
                      aria-hidden="false"
                      className="fade tab-pane active show"
                    >
                      {results}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
