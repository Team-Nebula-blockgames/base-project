import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import token from "../images/token.svg";
import Input from "./input";
import getEthers from "../getEthers";
import { Contract, utils } from "ethers";
import Token from "../contracts/Nestcoin.sol/Nestcoin.json";

function Admin(props) {
  const { methods, setTokens, tokens } = props;
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(tokens);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const provider = await getEthers();
      const signer = provider.getSigner();
      const address = signer.getAddress();
      const tokenContract = new Contract(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3",
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0px",
            height: "115px",
            width: "100%",
            marginBottom: "32px",
          }}
        >
          <Input
            text={"Enter Amount"}
            image={token}
            file={false}
            setAmount={setAmount}
          />
        </Box>
        <Button
          variant="contained"
          sx={{
            width: "209px",
            height: "60px",
            color: "white",
            backgroundColor: "#1949D9",
            fontWeight: 700,
            fontSize: "20px",
            lineHeight: "24px",
          }}
          onClick={() => {
            methods
              .mint(amount.toString())
              .then(() => {
                // setBalance(Number(balance) + amount);
                setTokens(tokens + amount);
                setOpen(true);
                setTimeout(() => {
                  setOpen(false);
                }, 1500);
              })
              .catch(() => {
                setOpen2(true);
                setTimeout(() => {
                  setOpen2(false);
                }, 1500);
              });
          }}
        >
          Mint
        </Button>
      </Box>
      {open && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
            background: "green",
            color: "white",
            width: "500px",
            height: "100px",
            position: "absolute",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            Tokens Minted!
          </Typography>
        </Box>
      )}
      {open2 && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
            background: "red",
            color: "white",
            width: "500px",
            height: "100px",
            position: "absolute",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            Transaction Failed
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Admin;
