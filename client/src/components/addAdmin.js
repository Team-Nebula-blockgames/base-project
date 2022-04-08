import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import scan from "../images/scan.svg";
import cross from "../images/cross.png";

function AddAdmin(props) {
  const { methods, setModal } = props;
  const [address, setAddress] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        position: "absolute",
        top: 0,
        left: 0,
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
        <div style={style.close__button}>
          <div style={style.white}></div>
          <img
            src={cross}
            alt="close-button"
            onClick={() => setModal(false)}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
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
            placeholder="Address"
            style={style.input2}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div style={style.imgContainer2}>
            <img alt="Scan Icon" src={scan} style={style.image} />
          </div>
        </div>
        <Box
          sx={{
            width: "464px",
            heigth: "60px",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "42px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: "222px",
              height: "60px",
              background: "#1949D9",
              borderRadius: "8px",
              color: "white",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "24px",
            }}
            onClick={async () => {
              console.log(address);
              await methods
                .grantRole(
                  "0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42",
                  address
                )
                .then(() => {
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
            Add Admin
          </Button>
          <Button
            sx={{
              width: "222px",
              height: "60px",
              border: "2px solid #1949D9",
              boxSizing: "border-box",
              borderRadius: "8px",
              color: "#1949D9",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "24px",
            }}
            onClick={async () => {
              methods
                .removeRole(
                  "0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42",
                  address
                )
                .then(() => {
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
            Remove Admin
          </Button>
        </Box>
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
            Succesful!
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
            Failed!
          </Typography>
        </Box>
      )}
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

  close__button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: "calc(100% - 16px)",
    top: "-16px",
    zIndex: 3,
    width: "32px",
    height: "32px",
    cursor: "pointer",
  },

  white: {
    backgroundColor: "white",
    width: "40%",
    height: "40%",
  },
};

export default AddAdmin;
