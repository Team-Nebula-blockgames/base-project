import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SvgIcon from "@mui/material/SvgIcon";

function SideBarItem(props) {
  const { icon, text, onClick } = props;
  return (
    <Box
      onClick={() => onClick()}
      sx={{
        height: "40px",
        backgroundColor: "#C6D4FF",
        width: "200.86px",
        color: "black",
        padding: "0px 0px 0px 0px",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <SvgIcon
        sx={{
          fontSize: "20px",
          marginRight: "16.5px",
          paddingLeft: "24px",
        }}
      >
        {icon}
      </SvgIcon>
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: "18px",
          lineHeight: "21.78px",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}

export default SideBarItem;
