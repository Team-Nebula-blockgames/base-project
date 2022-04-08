import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function SystemHealth(props) {
  const { methods } = props;
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

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
      <Button
        variant="contained"
        sx={{
          width: "209px",
          height: "60px",
          color: "white",
          backgroundColor: "red",
          fontWeight: 700,
          fontSize: "20px",
          lineHeight: "24px",
        }}
        onClick={() => {
          methods
            .destroy()
            .then(() => {
              setOpen(true);
              setTimeout(() => {
                setOpen(false);
              }, 2000);
            })
            .catch(() => {
              setOpen2(true);
              setTimeout(() => {
                setOpen2(false);
              }, 2000);
            });
        }}
      >
        Self Destruct
      </Button>
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
            System Destroyed! bye!
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
            Couldn't destroy system
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default SystemHealth;
