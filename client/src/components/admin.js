import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import token from "../images/token.svg";
import Input from "./input";

function Admin(props) {
  const { methods, getBalance, address, setTokens, tokens } = props;
  const [amount, setAmount] = useState(0);

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
        key={tokens}
      >
        Token Balance: {tokens}
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
            methods.mint(amount).then(async () => {
              const bal = (await getBalance(address)).toString();
              setTokens(bal);
            });
          }}
        >
          Mint
        </Button>
      </Box>
    </Box>
  );
}

export default Admin;
