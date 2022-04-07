import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import upload from "../images/upload.svg";
import token from "../images/token.svg";
import Input from "./input";
import Input2 from "./input2";
import { usePapaParse } from "react-papaparse";
import whitespaceFilter from "../utils/whitespaceFilter";

function Distribute(props) {
  const { tokenMethod, distributorMethod } = props;
  const [csv, setCsv] = useState(true);
  const [amount, setAmount] = useState(0);
  const [text, setText] = useState("");
  const [list, setList] = useState([]);

  const { readString } = usePapaParse();

  const handleSubmit = async () => {
    const csvString = text;

    readString(csvString, {
      worker: true,
      complete: async (results) => {
        const data = results.data[0];
        console.log("---------------------------");
        console.log(whitespaceFilter(data));
        console.log("---------------------------");
        const list = whitespaceFilter(data);
        tokenMethod
          .approveMulti(
            "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
            (amount * list.length * 10 ** 18).toString()
          )
          .then((result) => {
            if (result)
              distributorMethod
                .multiSend(
                  "0x5FbDB2315678afecb367f032d93F642f64180aa3",
                  list,
                  amount.toString()
                )
                .then(() => console.log("Distributed tokens"));
          });
      },
    });
  };

  const batchSend = async () => {
    tokenMethod
      .approveMulti(
        "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        amount.toString()
      )
      .then((result) => {
        if (result)
          distributorMethod
            .multiSend(
              "0x5FbDB2315678afecb367f032d93F642f64180aa3",
              list,
              amount.toString()
            )
            .then(() => console.log("Distributed tokens"));
      });
  };
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
        }}
      >
        <ButtonGroup>
          <Button
            onClick={() => setCsv(true)}
            style={{
              backgroundColor: csv ? "#1949D9" : "white",
              color: csv ? "white" : "#1949D9",
            }}
          >
            CSV
          </Button>
          <Button
            onClick={() => setCsv(false)}
            style={{
              backgroundColor: csv ? "white" : "#1949D9",
              color: csv ? "#1949D9" : "white",
            }}
          >
            text
          </Button>
        </ButtonGroup>
        <Box
          sx={{
            width: "461px",
            height: "354px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "0px",
            marginTop: "45px",
            marginLeft: "7px",
          }}
        >
          {csv ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0px",
                height: "115px",
                width: "100%",
                marginBottom: "32px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "0px",
                  marginBottom: "14px",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "20px",
                    lineHeight: "24px",
                    color: "black",
                  }}
                >
                  Filename
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "14px",
                    lineHeight: "17px",
                    color: "black",
                    opacity: 0.5,
                  }}
                >
                  Accept .csv file format only
                </Typography>
              </Box>
              <Input
                text={"file upload"}
                image={upload}
                file={true}
                setList={setList}
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0px",
                height: "115px",
                width: "100%",
                marginBottom: "32px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "0px",
                  marginBottom: "14px",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "20px",
                    lineHeight: "24px",
                    color: "black",
                  }}
                >
                  Text Input
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "14px",
                    lineHeight: "17px",
                    color: "black",
                    opacity: 0.5,
                  }}
                >
                  input a list of comma(,) seperated Addresses
                </Typography>
              </Box>
              <Input2 setText={setText} />
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "0px",
              height: "115px",
              width: "100%",
              marginBottom: "32px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0px",
                marginBottom: "14px",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "20px",
                  lineHeight: "24px",
                  color: "black",
                }}
              >
                Amount
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "14px",
                  lineHeight: "17px",
                  color: "black",
                  opacity: 0.5,
                }}
              >
                Amount of NCT tokens
              </Typography>
            </Box>
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
              csv ? batchSend() : handleSubmit();
            }}
          >
            Send Reward
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Distribute;
