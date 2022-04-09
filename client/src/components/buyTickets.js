import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Contract, utils } from "ethers";
import Token from "../contracts/Nestcoin.json";
import getEthers from "../getEthers";

function BuyTickets(props) {
  const {
    tokens,
    setTokens,
    ticketsBalance,
    setTicketsBalance,
    tokenMethod,
    distributorMethod,
    ticket_price,
  } = props;
  const [balance, setBalance] = useState(tokens);
  const [tickets, setTickets] = useState(ticketsBalance);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [ticketPrice, setTicketPrice] = useState(ticket_price);
  console.log("Hello");

  useEffect(() => {
    const getData = async () => {
      const provider = await getEthers();
      const signer = provider.getSigner();
      const address = signer.getAddress();
      const distributorContract = new Contract(
        process.env.REACT_APP_DISTRIBUTOR_ADDRESS,
        Token.abi,
        provider
      );
      const ticketBal = await distributorContract.ticket(address);
      const price = await distributorContract.ticketPrice();
      setTickets(ticketBal.toString());
      setTicketPrice(utils.formatEther(price));
    };

    getData().then(() => {
      console.log("Worked?");
    });
  }, []);

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
          left: "20px",
          fontWeight: 700,
          fontSize: "20px",
        }}
      >
        Tickets: {tickets}
      </Typography>
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
            marginTop: "20px",
          }}
          onClick={() => {
            tokenMethod
              .approve(
                process.env.REACT_APP_DISTRIBUTOR_ADDRESS,
                utils.parseEther("50")
              )
              .then((result) => {
                if (result)
                  distributorMethod
                    .claimTicket(process.env.REACT_APP_TOKEN_ADDRESS)
                    .then(() => {
                      setTickets(Number(tickets) + 1);
                      setTicketsBalance(Number(tickets) + 1);
                      setTokens(tokens - ticketPrice);
                      setBalance(balance - ticketPrice);
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
              });
          }}
        >
          Buy
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
            You bought one Ticket!
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

export default BuyTickets;
