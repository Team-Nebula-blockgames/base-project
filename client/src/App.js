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

function App() {
  const [tokens, setTokens] = useState(0);
  const [distributorMethods, setDistributorMethods] = useState({});
  const [tokenMethods, setTokenMethods] = useState({});
  const [controlMethods, setControlMethods] = useState({});
  const [view, setView] = useState("admin");
  const [tokenCheck, setTokenCheck] = useState();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const provider = await getEthers();
      const signer = provider.getSigner();
      const address = signer.getAddress();
      const tokenContract = new Contract(
        "0xb0D079a5d2cbc51cD0e7B054Ce55B4f37F535678",
        Token.abi,
        provider
      );
      const distributorContract = new Contract(
        "0xab513913C7Bf7C050E75BB62143a114f3AAF3f20",
        Distributor.abi,
        provider
      );
      const controlContract = new Contract(
        "0x9eBcF2A3035A07835359f7B637CAD0fc6a56eA8E ",
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
      </Box>
      {modal && <AddAdmin setModal={setModal} methods={tokenMethods} />}
    </Box>
  );
}

export default App;
