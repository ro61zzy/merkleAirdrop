javascript
const fs = require('fs');
const keccak256 = require('keccak256');
const { MerkleTree } = require('merkletreejs');
const csv = require('csv-parser');

let elements = [];

// Read the CSV file and generate hashed leaves
fs.createReadStream('airdrop.csv')
  .pipe(csv())
  .on('data', (row) => {
    const leaf = keccak256(row.address + row.amount);
    elements.push(leaf);
  })
  .on('end', () => {
    // Generate the Merkle Tree
    const merkleTree = new MerkleTree(elements, keccak256, { sortPairs: true });

    // Get the Merkle Root
    const root = merkleTree.getRoot().toString('hex');
    console.log('Merkle Root:', root);

    // Save the Merkle Root to a file
    fs.writeFileSync('merkleRoot.txt', root);

    // Save the Merkle Tree to a file (optional)
    fs.writeFileSync('merkleTree.json', JSON.stringify(elements));
  });