import { MerkleTree } from "merkletreejs";
import { keccak256 } from "ethers/lib/utils";

// 2. Collect list of wallet addresses from competition, raffle, etc.
// Store list of addresses in some data sheeet (Google Sheets or Excel)
export const whitelistAddresses = [
  "0x6d1120a2577B190e5174a443C9d6572154842Da6",
  "0xa3b8221494f71CE842d8A301A152Ff04800dEf8F",
  "0x538700033C608FCd79aF0D618474c566f4159A31",
  "0xA9030E4d214Fed04869363d8Fabe8DF314546787",
  "0xEc1fF2880C8b3E832828bFDB60011D4eDb6F820a",
  // "0xb7E922a40D96b36CaF7EDa77DE9CF6ecCC07Dbc5",
];

// // 3. Create a new array of `leafNodes` by hashing all indexes of the `whitelistAddresses`
// // using `keccak256`. Then creates a Merkle Tree object using keccak256 as the algorithm.
// //
// // The leaves, merkleTree, and rootHas are all PRE-DETERMINED prior to whitelist claim
// const leafNodes = whitelistAddresses.map((addr) => keccak256(addr));
// export const merkleTree = new MerkleTree(leafNodes, keccak256, {
//   sortPairs: true,
// });

// // 4. Get root hash of the `merkleeTree` in hexadecimal format (0x)
// // Print out the Entire Merkle Tree.
// const rootHash = merkleTree.getRoot();
// console.log("Whitelist Merkle Tree\n", merkleTree.toString());
// console.log("Root Hash: ", rootHash);
// // ***** ***** ***** ***** ***** ***** ***** ***** //

// // CLIENT-SIDE: Use `msg.sender` address to query and API that returns the merkle proof
// // required to derive the root hash of the Merkle Tree

// // ✅ Positive verification of address
// // const claimingAddress = leafNodes[0];
// // ❌ Change this address to get a `false` verification
// const claimingAddress = keccak256("0x6d1120a2577B190e5174a443C9d6572154842Da6");

// // const claimingAddress = keccak256("0xa3b8221494f71CE842d8A301A152Ff04800dEf8F");

// // `getHexProof` returns the neighbour leaf and all parent nodes hashes that will
// // be required to derive the Merkle Trees root hash.
// const hexProof = merkleTree.getHexProof(claimingAddress);
// console.log("hexProof:", [...hexProof]);

// // ✅ - ❌: Verify is claiming address is in the merkle tree or not.
// // This would be implemented in your Solidity Smart Contract
// // console.log(merkleTree.verify(hexProof, claimingAddress, rootHash));

// // NFTContract
// // 1 Deploy;
// // 2 Set Merkle Root;
// // Start Presale;
// // 3 Approval By User;
// // MINT

// // [
// //   "0x65386e0da7f65a3cc4d7a927bc93ce9db2c0dcebed950c2a8470ea5ca1cbd3a9",
// //   "0xe70858bb554a4248c616f00c3ea430ddee83a52085d4720cc722c8503cc2d0ba",
// //   "0x464e9d4c70ffaf649d1bd637b5a5a81f42aef20b56d638b0d23eec846eac9625",
// // ]
