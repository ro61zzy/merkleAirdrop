const { ethers } = require("hardhat");

async function main() {
  // Get the signers
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy ERC20 token
  const ERC20PresetMinterPauser = await ethers.getContractFactory("ERC20PresetMinterPauser");
  const token = await ERC20PresetMinterPauser.deploy("Test Token", "TTK");
  await token.deployed();

  console.log("ERC20PresetMinterPauser deployed to:", token.address);

  // Example Merkle root, replace with actual root
  const merkleRoot = "0x..."; // Replace with actual Merkle root

  // Deploy MerkleAirdrop contract
  const MerkleAirdrop = await ethers.getContractFactory("MerkleAirdrop");
  const merkleAirdrop = await MerkleAirdrop.deploy(token.address, merkleRoot);
  await merkleAirdrop.deployed();

  console.log("MerkleAirdrop deployed to:", merkleAirdrop.address);

  // Optionally, you can return addresses or do additional setup
  return { tokenAddress: token.address, merkleAirdropAddress: merkleAirdrop.address };
}

// Run the deploy script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
