const { ethers } = require("hardhat");

async function main() {
    // Get a fake Hardhat account instead of a real wallet
    const [deployer] = await ethers.getSigners();  

    console.log("Deploying contract with fake wallet:", deployer.address);

    // Mock contract deployment (will succeed without real funds)
    const CarbonCredit = await ethers.getContractFactory("CarbonCredit");
    const carbonCredit = await CarbonCredit.deploy(deployer.address);  // No real transaction

    await carbonCredit.deployed();
    console.log("CarbonCredit contract deployed at:", carbonCredit.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
