import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import scan from "../images/scan.svg";

function AddAdmin(props) {
  const { methods, setModal } = props;
  const [address, setAddress] = useState("");

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        position: "absolute",
        color: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(128, 128, 128, 0.515)",
        zIndex: 10,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px",
          position: "relative",
          width: "544px",
          height: "363px",
          background: "#FFFFFF",
          boxShadow: "0px 4px 84px rgba(104, 86, 86, 0.25)",
          borderRadius: "3px",
        }}
      >
        <Box
          sx={{
            marginTop: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "24px",
              color: "#000000",
            }}
          >
            New Admin
          </Typography>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "14px",
              lineHeight: "17px",
              color: "#000000",
              opacity: 0.5,
            }}
          >
            Ensure all the details are correct
          </Typography>
        </Box>
        <div style={style.outer}>
          <input
            type="text"
            placeholder="Amount"
            style={style.input2}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div style={style.imgContainer2}>
            <img alt="image" src={scan} style={style.image} />
          </div>
        </div>
        <Box
          sx={{
            width: "464px",
            heigth: "60px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            sx={{
              width: "222px",
              height: "60px",
              background: "#1949D9",
              borderRadius: "8px",
              color: "white",
            }}
          >
            Add New Admin
          </Button>
          <Button
            sx={{
              width: "222px",
              height: "60px",
              border: "2px solid #1949D9",
              boxSizing: "border-box",
              borderRadius: "8px",
              color: "#1949D9",
            }}
            onClick={() => setModal(false)}
          >
            Discard
          </Button>
        </Box>
      </Box>
    </Box>
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
    marginTop: "22px",
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

export default AddAdmin;
