import React from "react";
import Grid from "@mui/material/Grid/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function NavBar(props) {
  const { setModal } = props;

  return (
    <Box
      sx={{
        height: "97px",
        backgroundColor: "#C6D4FF",
        width: "100%",
        display: "flex",
        alignItems: "center",
        boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ color: "black", padding: "24px" }}
      >
        <Grid item>
          <Box>
            <Typography
              sx={{
                fontFamily: "Inter",
                fontSize: "24px",
                fontWeight: 700,
                lineHeight: "29px",
                letterSpacing: "0em",
                textAlign: "right",
                color: "black",
                marginBottom: "0px",
              }}
            >
              NestCoin
            </Typography>
            <Typography
              sx={{
                fontFamily: "Inter",
                fontSize: "10px",
                fontWeight: 400,
                lineHeight: "12.1px",
                letterSpacing: "0em",
                textAlign: "right",
                marginTop: "6px",
                color: "black",
              }}
            >
              Filmhouse
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Button
            color="inherit"
            sx={{
              border: "2px solid #1949D9",
              color: "#1949D9",
            }}
            onClick={() => setModal(true)}
          >
            Add/Remove Admin
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default NavBar;
