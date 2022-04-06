import React, { useEffect, useState } from "react";
import getEthers from "./getEthers";
import { Contract, utils } from "ethers";
import Token from "./contracts/Token.sol/Nestcoin.json";
import Distributor from "./contracts/Airdrop.sol/MultiTransferTokenEqual.json";
import Control from "./contracts/AccessControl.sol/AccessControl.json";
import "./App.css";
import Box from "@mui/material/Box";
import NavBar from "./components/navbar";
import SideBar from "./components/sidebar";
import Distribute from "./components/distribute";
import Admin from "./components/admin";
import AddAdmin from "./components/addAdmin";

function App() {
  const [tokens, setTokens] = useState(0);
  const [balance, setBalance] = useState(0);
  const [distributorMethods, setDistributorMethods] = useState({});
  const [tokenMethods, setTokenMethods] = useState({});
  const [controlMethods, setControlMethods] = useState({});
  const [view, setView] = useState("admin");
  const [tokenCheck, setTokenCheck] = useState();
  const [address, setAddress] = useState("");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const provider = await getEthers();
      const signer = provider.getSigner();
      const address = signer.getAddress();
      const bal = await provider.getBalance(address);
      const balance = utils.formatEther(bal);
      setBalance(balance);
      const tokenContract = new Contract(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        Token.abi,
        provider
      );
      const distributorContract = new Contract(
        "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        Distributor.abi,
        provider
      );
      const controlContract = new Contract(
        "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        Control.abi,
        provider
      );
      setDistributorMethods(distributorContract.connect(signer));
      setTokenMethods(tokenContract.connect(signer));
      setControlMethods(controlContract.connect(signer));
      // getting the balance of tokens and setting it
      const tokenBalance = (await tokenContract.balanceOf(address)).toString();
      setTokenCheck(tokenContract.balanceOf);
      setAddress(address);
      setTokens(tokenBalance);
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
        {view === "distribute" && <Distribute methods={distributorMethods} />}
        {view === "admin" && (
          <Admin
            methods={tokenMethods}
            getBalance={tokenCheck}
            address={address}
            setTokens={setTokens}
            tokens={tokens}
          />
        )}
      </Box>
      {modal && <AddAdmin setModal={setModal} methods={controlMethods} />}
    </Box>
  );
}

export default App;
