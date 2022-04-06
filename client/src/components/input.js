import React from "react";

function Input(props) {
  const { text, image, file, setAmount } = props;
  return file ? (
    <div style={style.outer}>
      <p style={style.text}>{text}</p>
      <label for="file-upload" style={style.imgContainer}>
        <img alt="image" src={image} style={style.image} />
      </label>
      <input id="file-upload" type="file" style={style.input} />
    </div>
  ) : (
    <div style={style.outer}>
      <input
        type="text"
        placeholder="Amount"
        style={style.input2}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <div style={style.imgContainer2}>
        <img alt="image" src={image} style={style.image} />
      </div>
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

    position: "relative",
    width: "461px",
    height: "60px",

    border: "1px solid #C4C4C4",
    boxSizing: "border-box",
    borderRadius: "8px",
  },

  text: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "20px",
    lineHeight: "24px",
    color: "#938989",
  },

  imgContainer: {
    width: "66px",
    height: "39px",
    cursor: "pointer",
  },

  imgContainer2: {
    width: "66px",
    height: "39px",
    cursor: "pointer",
    position: "absolute",
    left: "390px",
    top: "10.5px",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  input: {
    display: "none",
  },

  input2: {
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

export default Input;
