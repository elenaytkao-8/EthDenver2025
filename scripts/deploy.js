const hre = require("hardhat");

async function main() {
  const CarbonCredit = await hre.ethers.getContractFactory("CarbonCredit");
  const carbonCredit = await CarbonCredit.deploy();

  await carbonCredit.deployed();

  console.log("CarbonCredit deployed to:", carbonCredit.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});