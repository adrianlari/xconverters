export const FunctionCard = (props: any) => {
  const index = 0;

  return (
    <div
      onMouseOver={() => {
        props.hover(index);
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
                  display: index === 0 ? "block" : "none",
                  backgroundColor: "transparent",
                }}
              >
                <div className="card-header-item d-flex align-items-center">
                  <span>The function is: {props.word}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunctionCard;
