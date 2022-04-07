import React from "react";

function Input2(props) {
  const { setText } = props;
  return (
    <div style={style.outer}>
      <input
        type="text"
        placeholder="paste Addresses"
        style={style.input}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}

const style = {
  outer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 5px 8px 8px",

    position: "static",
    width: "461px",
    height: "60px",

    border: "1px solid #C4C4C4",
    boxSizing: "border-box",
    borderRadius: "8px",
  },

  input: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    border: "none",
    outline: "none",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "20px",
    lineHeight: "24px",
    color: "#938989",
  },
};

export default Input2;
