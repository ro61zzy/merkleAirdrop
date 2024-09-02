# Merkle Airdrop Smart Contract

This repository contains a smart contract for an ERC20 token airdrop that utilizes a Merkle tree for whitelisting addresses. The project teaches how to generate a Merkle root from a list of eligible addresses, implement a Solidity contract to verify claims against this Merkle root, and manage the entire airdrop process.

## Project Structure

- **contracts/**: Contains Solidity smart contracts.
  - `MerkleAirdrop.sol`: Main contract for managing the airdrop.
  - `ERC20PresetMinterPauser.sol`: ERC20 token implementation.
- **scripts/**: Contains deployment scripts.
  - `deploy.js`: Script for deploying the smart contracts.
  -  - `merkle.js`: Script for generating Merkle tree and root.
- **test/**: Contains test scripts.
  - `MerkleAirdrop.js`: Test cases for the MerkleAirdrop contract. >>> this not work

## Setup

### Prerequisites
- Node.js
- Hardhat
- OpenZeppelin Contracts

### Installation

-- Clone the repository:
 
  ``` git clone <repository_url>```
  ``` cd <repository_directory>```

### Install Dependencies

Make sure you have Node.js installed. Then, install the project dependencies:


```npm install```

### Compile Contracts

Compile the Solidity contracts using Hardhat:


```npx hardhat compile```

### Generate Merkle Root

Prepare your CSV file with the list of addresses and amounts.

Update the merkle.js script to generate the Merkle tree and root.

### Run the script:

```node utils/merkle.js```

Copy the generated Merkle root to use in the deployment script.

### Deployment

  Deploy Contracts
  Update the Merkle root in the deploy.js script, then deploy the contracts:

```npx hardhat run scripts/deploy.js --network <network-name>```

Replace <network-name> with the desired network (e.g., localhost, rinkeby, etc.).

### Verify Deployment

After deployment, verify the addresses of the deployed contracts and ensure they are correctly configured.

### Testing
- Run Tests
  Ensure that your contracts are compiled and run the test cases:
```npx hardhat test```

This will execute the test suite and verify that the Merkle Airdrop contract functions as expected.


