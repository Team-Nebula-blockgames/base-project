import React, { useEffect, useState } from "react";
import getEthers from "./getEthers";
import { Contract, utils } from "ethers";
import Token from "./contracts/Nestcoin.json";
import Distributor from "./contracts/MultiTransferTokenEqual.json";
import Control from "./contracts/AccessControl.json";
import "./App.css";
import Box from "@mui/material/Box";
import NavBar from "./components/navbar";
import SideBar from "./components/sidebar";
import Distribute from "./components/distribute";
import Admin from "./components/admin";
import AddAdmin from "./components/addAdmin";
import FindUser from "./components/findUser";
import SystemHealth from "./components/systemHealth";
import BuyTickets from "./components/buyTickets";

function App() {
  const [tokens, setTokens] = useState(0);
  const [distributorMethods, setDistributorMethods] = useState({});
  const [tokenMethods, setTokenMethods] = useState({});
  const [controlMethods, setControlMethods] = useState({});
  const [view, setView] = useState("admin");
  const [tokenCheck, setTokenCheck] = useState();
  const [modal, setModal] = useState(false);
  console.log(process.env);
  console.log(process.env.REACT_APP_TOKEN_ADDRESS);

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
      const distributorContract = new Contract(
        process.env.REACT_APP_DISTRIBUTOR_ADDRESS,
        Distributor.abi,
        provider
      );
      const controlContract = new Contract(
        process.env.REACT_APP_CONTROL_ADDRESS,
        Control.abi,
        provider
      );
      setDistributorMethods(distributorContract.connect(signer));
      setTokenMethods(tokenContract.connect(signer));
      setControlMethods(controlContract.connect(signer));
      // getting the balance of tokens and setting it
      const tokenBalance = (await tokenContract.balanceOf(address)).toString();
      setTokenCheck(tokenContract);
      setTokens(utils.formatEther(tokenBalance));
      // contract.on("Transfer", async (from, to, amount, event) => {
      //   const bal = await provider.getBalance(address);
      //   const balance = utils.formatEther(bal);
      //   const tokenBalance = (await contract.balanceOf(address)).toString();
      //   setBalance(tokenBalance);
      //   setEthBalance(balance);
      // });
    };
    getData().then(() => {});
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ flexGrow: 1 }}>
        <NavBar setModal={setModal} />
      </Box>
      <Box sx={{ display: "flex" }}>
        <SideBar setView={setView} />
        {view === "distribute" && (
          <Distribute
            tokenMethod={tokenMethods}
            distributorMethod={distributorMethods}
            setTokens={setTokens}
            tokens={tokens}
          />
        )}
        {view === "admin" && (
          <Admin methods={tokenMethods} setTokens={setTokens} tokens={tokens} />
        )}
        {view === "finduser" && <FindUser tokenCheck={tokenCheck} />}
        {view === "systemhealth" && <SystemHealth methods={tokenMethods} />}
        {view === "buytickets" && (
          <BuyTickets
            methods={tokenMethods}
            setTokens={setTokens}
            tokens={tokens}
          />
        )}
      </Box>
      {modal && <AddAdmin setModal={setModal} methods={tokenMethods} />}
    </Box>
  );
}

export default App;
