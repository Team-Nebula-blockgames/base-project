import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import scan from "../images/scan.svg";
import { utils } from "ethers";

function FindUser(props) {
  const { tokenCheck } = props;
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [user, setUser] = useState(false);
  const [fail, setFail] = useState(false);

  return (
    <Box
      sx={{
        height: "calc(100vh - 130px)",
        color: "black",
        borderTop: "1px solid #C4C4C4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "80%",
          height: "80%",
          borderRadius: "16px",
          boxShadow: "2px 2px 60px rgba(0, 0, 0, 0.11)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            marginTop: "60px",
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
            Find a Customer
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
            Check the existence and reward balane of customers
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60px",
            width: "100%",
            marginTop: "30px",
          }}
        >
          <div style={style.outer}>
            <input
              type="text"
              placeholder="Address"
              style={style.input2}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div style={style.imgContainer2}>
              <img alt="Scan Icon" src={scan} style={style.image} />
            </div>
          </div>
          <Button
            variant="contained"
            sx={{
              width: "120px",
              height: "60px",
              background: "#1949D9",
              borderRadius: "8px",
              color: "white",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "24px",
              marginLeft: "15px",
            }}
            onClick={() => {
              if (utils.isAddress(address)) {
                tokenCheck.balanceOf(address).then((result) => {
                  setUser(true);
                  setBalance(utils.formatEther(result.toString()));
                  setFail(false);
                });
              } else {
                setFail(true);
                setUser(false);
              }
            }}
          >
            Find
          </Button>
        </Box>
        {user && (
          <Box
            sx={{
              marginTop: "20px",
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
              {balance > 0 ? "Customer Found!" : "Customer not Found"}
            </Typography>
            {balance > 0 && (
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "14px",
                  lineHeight: "17px",
                  color: "#000000",
                  opacity: 0.5,
                }}
              >
                Balance: {balance} NCT
              </Typography>
            )}
          </Box>
        )}
        {fail && (
          <Box
            sx={{
              marginTop: "20px",
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
                color: "red",
              }}
            >
              Invalid Address
            </Typography>
          </Box>
        )}
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
    width: "80%",
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

export default FindUser;
