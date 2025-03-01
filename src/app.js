import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const abi = [
  // ABI generated from Hardhat (copy from artifacts/contracts/CarbonCredit.sol/CarbonCredit.json)
];

function App() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [totalRetired, setTotalRetired] = useState(0);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        setProvider(provider);
        setContract(contract);

        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);

        const balance = await contract.balanceOf(accounts[0]);
        setBalance(ethers.utils.formatUnits(balance, 18));

        const retired = await contract.getTotalRetired();
        setTotalRetired(ethers.utils.formatUnits(retired, 18));
      }
    };
    init();
  }, []);

  const handleRetire = async () => {
    const tx = await contract.retire(ethers.utils.parseUnits(amount, 18));
    await tx.wait();
    alert("Credits retired successfully!");
    window.location.reload();
  };

  return (
    <div className="App">
      <h1>Carbon Credit Token (CO2)</h1>
      <p>Your Account: {account}</p>
      <p>Your Balance: {balance} CO2</p>
      <p>Total Credits Retired: {totalRetired} CO2</p>
      <div>
        <input
          type="text"
          placeholder="Amount to retire"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleRetire}>Retire Credits</button>
      </div>
    </div>
  );
}

export default App;