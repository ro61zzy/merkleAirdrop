const { expect } = require("chai");
const { ethers } = require("hardhat");
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

describe("MerkleAirdrop", function () {
    let token;
    let merkleAirdrop;
    let deployer;
    let user;
  
    before(async function () {
      [deployer, user] = await ethers.getSigners();
  
      // Deploy ERC20 token
      const ERC20PresetMinterPauser = await ethers.getContractFactory("ERC20PresetMinterPauser");
      token = await ERC20PresetMinterPauser.deploy("Test Token", "TTK");
      await token.deployed();
  
      // Deploy MerkleAirdrop contract
      const MerkleAirdrop = await ethers.getContractFactory("MerkleAirdrop");
      const merkleRoot = "0x..."; // Replace with actual Merkle root for testing
      merkleAirdrop = await MerkleAirdrop.deploy(token.address, merkleRoot);
      await merkleAirdrop.deployed();
    });
  

  it("Should allow valid claims", async function () {
    const claimAmount = ethers.utils.parseUnits("100", 18);

    // Generate proof for addr1
    const leaf = keccak256(ethers.utils.solidityKeccak256(["address", "uint256"], [addr1.address, 100]));
    const proof = merkleTree.getHexProof(leaf);

    // Claim the airdrop
    await expect(airdrop.connect(addr1).claim(claimAmount, proof))
      .to.emit(airdrop, "Claimed")
      .withArgs(addr1.address, claimAmount);

    expect(await token.balanceOf(addr1.address)).to.equal(claimAmount);
  });

  it("Should reject invalid claims", async function () {
    const claimAmount = ethers.utils.parseUnits("200", 18);

    // Generate an invalid proof (for example, using addr2's leaf for addr3)
    const leaf = keccak256(ethers.utils.solidityKeccak256(["address", "uint256"], [addr2.address, 200]));
    const proof = merkleTree.getHexProof(leaf);

    await expect(airdrop.connect(addr3).claim(claimAmount, proof)).to.be.revertedWith("Invalid proof");
  });

  it("Should prevent double claims", async function () {
    const claimAmount = ethers.utils.parseUnits("100", 18);

    // Generate proof for addr1
    const leaf = keccak256(ethers.utils.solidityKeccak256(["address", "uint256"], [addr1.address, 100]));
    const proof = merkleTree.getHexProof(leaf);

    // First claim should succeed
    await expect(airdrop.connect(addr1).claim(claimAmount, proof))
      .to.emit(airdrop, "Claimed")
      .withArgs(addr1.address, claimAmount);

    // Second claim should fail
    await expect(airdrop.connect(addr1).claim(claimAmount, proof)).to.be.revertedWith("Airdrop already claimed");
  });

  it("Should allow owner to withdraw remaining tokens", async function () {
    const ownerBalanceBefore = await token.balanceOf(owner.address);
    await airdrop.withdrawRemainingTokens();
    const ownerBalanceAfter = await token.balanceOf(owner.address);

    expect(ownerBalanceAfter).to.be.gt(ownerBalanceBefore);
  });
});
