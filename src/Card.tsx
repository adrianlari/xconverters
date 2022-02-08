import React from "react";

// interface CardParams {
//   index: number;
//   results: React.Component;
//   word: string;
//   onClick: func
// }

export const Card = (props: any) => {
  // const [backColor, setBackColor] = React.useState("");
  const index = props.index;

  return (
    <div
      onClick={() => {
        props.click(index);
        //console.log({ index });
        //setBackColor(backColor === "red" ? "transparent" : "red");
      }}
      style={{ marginTop: "2%" }}
      // style={{ marginTop: "2%", backgroundColor: backColor }}
      key={index}
    >
      <div className="container page-content">
        <div className="row">
          <div className="col-9" style={{ marginLeft: "12.5%" }}>
            <div className="transaction-info card">
              <div
                className="card-header status-text-success"
                style={{
                  display: index === 0 ? "block" : "none",
                  backgroundColor: "transparent",
                }}
              >
                <div className="card-header-item d-flex align-items-center">
                  <span>The function is: {props.word}</span>
                </div>
              </div>
              <div
                className="card-header status-text-success"
                // style={{ backgroundColor: "transparent" }}
                style={{
                  display: index !== 0 ? "block" : "none",
                  backgroundColor: "transparent",
                }}
              >
                <div
                  className="card-header-item d-flex align-items-center"
                  style={{ display: index !== 0 ? "block" : "none" }}
                >
                  <span>Possible Conversions for {props.word}</span>
                </div>
              </div>
              <div
                className="card-body p-0"
                style={{ display: index !== 0 ? "block" : "none" }}
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
                      {props.results}
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
