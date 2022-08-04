import { ethers } from "hardhat";

async function main() {
  const Patent = await ethers.getContractFactory("Patent");
  const patent = await Patent.deploy();

  await patent.deployed();

  console.log("Patent deployed to:", patent.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
