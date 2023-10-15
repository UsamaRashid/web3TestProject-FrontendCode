import React, { useEffect, useState } from "react";
import {
  provider,
  RewardingContract,
  NFTContract,
  merkleTree,
  NFTContract_ABI,
  NFTContractaddress,
} from "../EtherConfig";
import Card from "react-bootstrap/Card";

import { ethers, Wallet } from "ethers";
import { Col, Row } from "react-bootstrap";

export default function MyCollection({ currentUser }) {
  console.log("MY collection Component");
  const [collection, setCollection] = useState([]);
  const [address, setAddresses] = useState([]);

  // setCollection([]);
  useEffect(() => {
    // async function getCollection() {
    //   // await NFTContract.CurrentlyOwnedTokens().then((result) => {
    //   //   console.log("result" + result);
    //   // });

    //   if (
    //     typeof window.ethereum !== "undefined" ||
    //     typeof window.web3 !== "undefined"
    //   ) {
    //     // Web3 browser user detected. You can now use the provider.
    //     const accounts = await window.ethereum.request({
    //       method: "eth_requestAccounts",
    //     });
    //     const provider = new ethers.providers.Web3Provider(window.ethereum);
    //     const walletAddress = accounts[0];
    //     const signer = provider.getSigner(walletAddress);
    //     console.log("accounts: ", accounts);
    //     console.log("provider: ", provider);

    //     const NFTContractSigner = new ethers.Contract(
    //       NFTContractaddress,
    //       NFTContract_ABI,
    //       signer
    //     );
    //     const CurrentlyOwnedTokens =
    //       await NFTContractSigner.CurrentlyOwnedTokens();
    //     console.log("currentlyOwnedTokens", CurrentlyOwnedTokens);
    //     setCollection(CurrentlyOwnedTokens);
    //     setCollection([]);
    //     CurrentlyOwnedTokens.map((number) => {
    //       setCollection((old) => [...old, number]);
    //     });

    //     //     // CurrentlyOwnedTokens.map((_hex, _isBigNumber) => {
    //     //     //   // let Data = await NFTContractSigner.tokenURI(1);
    //     //     //   console.log("no: ", parseInt(_hex, 10), _hex, _isBigNumber);
    //     //     //   // console.log("DATA :", Data);
    //     //     //   // setCollection([]);

    //     //     //   setCollection((old) => [...old, parseInt(_hex, 16)]);
    //     // });
    //   }
    // }
    async function getCollectionMetaData() {
      setCollection([]);
      if (
        typeof window.ethereum !== "undefined" ||
        typeof window.web3 !== "undefined"
      ) {
        // Web3 browser user detected. You can now use the provider.
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const walletAddress = accounts[0];
        const signer = provider.getSigner(walletAddress);
        console.log("accounts: ", accounts);
        console.log("provider: ", provider);

        const NFTContractSigner = new ethers.Contract(
          NFTContractaddress,
          NFTContract_ABI,
          signer
        );
        const CurrentlyOwnedTokens =
          await NFTContractSigner.CurrentlyOwnedTokens().then((result) => {
            console.log("result", result);
            result.map(async (token) => {
              console.log("TokenURI ", token);
              if (token != 0)
                await NFTContractSigner.tokenURI(token).then(async (uri) => {
                  console.log("TokenURI::: ", uri);
                  fetch(
                    uri.replace("ipfs://", "https://ipfs.io/ipfs/")
                    // "https://ipfs.io/ipfs/QmWXBa2LKzb3ZpNNfxcmKFi37uoNvCoWRYNQ151wW95Gbw/25.json"
                  )
                    .then((res) => res.json())
                    .then(
                      (Data) => {
                        console.log("Data", Data);
                        console.log(
                          "TokenData.attributes.itemType:",
                          Data.attributes[0].itemType
                        );
                        setCollection((prevArray) => [...prevArray, Data]);
                        console.log("CollectionCurrent :", collection);
                      }

                      // fetch(uri).then((response) => {
                      //   console.log("response" + response);
                      // }
                    );
                });
            });
          });

        console.log("Collection is collection:", collection);

        // setCollection(CurrentlyOwnedTokens);
        // setCollection([]);
        // CurrentlyOwnedTokens.map((number) => {
        // setCollection((old) => [...old, number]);
        // });
      }
    }

    // Call Functions
    // getCollection();
    getCollectionMetaData();
  }, [currentUser]);
  return (
    <div className="container p-0 ">
      <h3>Your Collectibles</h3>
      <div className="row">
        {/* <div style={{ align: "center", padding: "2em", width: "500px" }}> */}
        {collection.length > 0 &&
          collection.map((TokenData) => {
            return (
              <div className="col-lg-4 p-1">
                <Card>
                  <Card.Img
                    variant="top"
                    src={TokenData.image.replace(
                      "ipfs://",
                      "https://ipfs.io/ipfs/"
                    )}
                  />
                  <Card.Body>
                    <Card.Title> {TokenData.name}</Card.Title>
                    <Card.Subtitle>{TokenData.description}</Card.Subtitle>

                    <Card.Text>
                      <b>Type:</b>
                      {TokenData.attributes[0].itemType}
                      <b>TokenID:</b>
                      <hr />
                      {TokenData.attributes[1].itemNumber}
                    </Card.Text>
                  </Card.Body>
                </Card>
                {/* <div class="card"> */}
                {/* <li id={TokenData.attributes.itemNumber}> */}
                {/* <div>
                  <b>Name:</b>
                  {TokenData.name}
                </div> */}
                {/* <div>
                  <b>Description:</b> {TokenData.description}
                </div> */}
                {/* <div>
                  <b>Item Type:</b>
                  {TokenData.attributes[0].itemType}
                </div>
                <div>
                  <b>TokenID:</b>
                  {TokenData.attributes[1].itemNumber}
                </div> */}

                {/* </li> */}
                {/* <img
                  src={TokenData.image.replace(
                    "ipfs://",
                    "https://ipfs.io/ipfs/"
                  )}
                  // {TokenData.image}
                  // "
                  //   // https://ipfs.io/ipfs/QmZb8qCPDwsappXKbT9yohi2nEpjHDCwAoEYJMuE8x4Stz/25.jpg
                  //   "
                  alt={TokenData.image.replace(
                    "ipfs://",
                    "https://ipfs.io/ipfs/"
                  )}
                >
                </img> */}
              </div>
            );
          })}

        {collection.length == 0 && <div>No Tokens Minted yet</div>}
      </div>
    </div>
  );
}
