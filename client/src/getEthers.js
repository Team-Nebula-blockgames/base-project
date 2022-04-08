import { ethers } from "ethers";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        resolve(provider);
      }
      // Legacy dapp browsers...
      else {
        const provider = new ethers.providers.JsonRpcProvider();
        resolve(provider);
      }
    });
  });

export default getWeb3;
