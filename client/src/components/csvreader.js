import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { usePapaParse } from "react-papaparse";
import whitespaceFilter from "../utils/whitespaceFilter";

function Reader(props) {
  const [text, setText] = useState("");

  const { readString } = usePapaParse();

  const handleReadString = () => {
    const csvString = text;

    readString(csvString, {
      worker: true,
      complete: (results) => {
        const data = results.data[0];
        console.log("---------------------------");
        console.log(whitespaceFilter(data));
        console.log("---------------------------");
      },
    });
  };

  return (
    <Box
      sx={{
        height: "calc(100vh - 130px)",
        width: "calc(100vw - 200.86px)",
        color: "black",
        borderTop: "1px solid #C4C4C4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            color: "#8a2be2",
            marginBottom: "0px",
            alignSelf: "flex-start",
          }}
        >
          Username
        </Typography>
        <TextField
          variant="filled"
          placeholder="addresses"
          onChange={(e) => setText(e.target.value)}
          color="primary"
        />
        <Button
          color="inherit"
          sx={{
            border: "2px solid #1949D9",
            color: "#1949D9",
          }}
          onClick={() => handleReadString()}
        >
          Test Reader
        </Button>
      </Box>
    </Box>
  );
}

export default Reader;
