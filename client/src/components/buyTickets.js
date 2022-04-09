import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Contract, utils } from "ethers";
import AddSharp from "@material-ui/icons/AddSharp";
import Remove from "@material-ui/icons/Remove";
import Token from "../contracts/Nestcoin.json";
import getEthers from "../getEthers";

function BuyTickets(props) {
  const { tokens, ticketPrice } = props;
  const [balance, setBalance] = useState(tokens);
  const [tickets, setTickets] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const provider = await getEthers();
      const signer = provider.getSigner();
      const address = signer.getAddress();
      const tokenContract = new Contract(
        process.env.REACT_APP_TOKEN_ADDRESS,
        Token.abi,
        provider
      );

      tokenContract.balanceOf(address).then((result) => {
        console.log("Its updating");
        setBalance(utils.formatEther(result));
      });
    };

    getData().then(() => {});
  }, [tokens]);

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
      <Typography
        sx={{
          position: "absolute",
          top: "20px",
          right: "20px",
          fontWeight: 700,
          fontSize: "20px",
        }}
      >
        Token Balance: {balance}
      </Typography>
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
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "20px",
            lineHeight: "24px",
            color: "#000000",
          }}
        >
          Buy Tickets
        </Typography>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "14px",
            lineHeight: "17px",
            color: "#000000",
            opacity: 0.5,
            marginBottom: "20px",
          }}
        >
          One ticket is worth {ticketPrice ? "10" : "50"} NCT
        </Typography>
        <ButtonGroup size="small">
          <Button
            startIcon={
              <Remove style={{ color: "#8a2be2", backgroundColor: "white" }} />
            }
            variant="contained"
            style={{
              backgroundColor: "white",
              color: "#8a2be2",
            }}
            onClick={() => setTickets(tickets - 1)}
          >
            Minus
          </Button>
          <Button
            startIcon={
              <AddSharp
                style={{ color: "#8a2be2", backgroundColor: "white" }}
              />
            }
            variant="contained"
            style={{
              backgroundColor: "white",
              color: "#8a2be2",
            }}
            onClick={() => setTickets(tickets + 1)}
          >
            Plus
          </Button>
        </ButtonGroup>
        <div style={style.tokenDisplay}>
          <p style={style.text}>{tickets}</p>
        </div>
        {balance > 0 && (
          <Box sx={{ padding: 0, marginTop: "10px" }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "14px",
                lineHeight: "17px",
                color: "#000000",
                opacity: 0.5,
              }}
            >
              Your buying {tickets} tickets, you'll pay {tickets * ticketPrice}{" "}
              NCT
            </Typography>
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
                marginTop: "10px",
              }}
              onClick={() => {}}
            >
              Buy
            </Button>
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

  tokenDisplay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40px",
    height: "40px",

    border: "1px solid #C4C4C4",
    boxSizing: "border-box",
    borderRadius: "8px",
    marginTop: "10px",
  },

  text: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "20px",
    lineHeight: "24px",
    color: "blue",
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

export default BuyTickets;
