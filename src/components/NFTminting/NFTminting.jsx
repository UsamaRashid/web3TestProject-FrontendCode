import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import "../Global.css";
import { whitelistAddresses } from "../EtherConfig";
import { useContractRead, useContractWrite } from "wagmi";

import {
  RewardingToken,
  NFTContract,
  TokenStakingContract,
} from "../wagmiConfigurations";
import { keccak256 } from "ethers/lib/utils";
import MerkleTree from "merkletreejs";

const NFTminting = ({ currentUser }) => {
  const [Approval, setApproval] = useState(false);
  const [Displayerror, setError] = useState("");
  const [DisplaySuccess, setSuccess] = useState(null);
  const [hexProof, setHexProof] = useState("");
  const { data: rewardingBal } = useContractRead({
    ...RewardingToken,
    functionName: "balanceOf",
    args: [currentUser],
  });

  const { data: mintingState } = useContractRead({
    ...NFTContract,
    functionName: "mintingCurrentState",
    watch: true,
    // args: [currentUser],
  });
  const { data: Owner } = useContractRead({
    ...NFTContract,
    functionName: "owner",
  });

  const { data: Approvalval } = useContractRead({
    ...RewardingToken,
    functionName: "allowance",
    args: [currentUser, NFTContract.address],
    watch: true,
  });

  const { data: BalOfCurrUser } = useContractRead({
    ...RewardingToken,
    functionName: "balanceOf",
    args: [currentUser],
    watch: true,
  });
  useEffect(() => {
    console.log("Data Rewarding Bal:", rewardingBal);
  }, [rewardingBal]);

  useEffect(() => {
    console.log("Data mintingState:", mintingState);
  }, [mintingState]);

  useEffect(() => {
    console.log("Data Owner:", Owner);
  }, [Owner]);

  useEffect(() => {
    // console.log("Data Approvalval:", parseInt(Approvalval._hex, 16) / 10 ** 5);
    if (Approvalval != undefined) {
      if (parseInt(Approvalval._hex, 16) == 0) setApproval(false);
      else setApproval(true);
    }
  }, [Approvalval]);

  useEffect(() => {
    if (currentUser != null || !currentUser != undefined) {
      console.log(
        "Data BalOfCurrUser:"
        // parseInt(BalOfCurrUser._hex, 16) / 10 ** 5
      );
    }
  }, [BalOfCurrUser]);

  const {
    isLoading,
    error,
    write: startPreSale,
  } = useContractWrite({
    ...NFTContract,
    functionName: "startPreSale",
  });

  const { write: EndPresale } = useContractWrite({
    ...NFTContract,
    functionName: "endPreSale",
  });

  const handleStartPreSale = () => {
    console.log("handle Start PreSale called");
    startPreSale({ args: [] });
  };

  const handleEndPreSale = () => {
    console.log("handle EndPresale called");
    EndPresale({ args: [] });
  };

  // const { config: mintingToken } = usePrepareContractWrite({

  // const claimingAddress = keccak256(currentUser);
  // const hexProof = merkleTree.getHexProof(claimingAddress);
  // console.log("hexProof:", [...hexProof]);

  const {
    data: TokenID,
    isLoading: mintisLoading,
    isSuccess: mintisSuccess,
    write: mintToken,
    status: mintstatus,
    error: minterror,
  } = useContractWrite({
    ...NFTContract,
    functionName: "mintDEV",
    args: [hexProof],
    onSettled(data, error) {
      // setError(minterror);
      if (error) {
        setError(error.reason);
      } else {
        // setError(data.status);
        console.log("data: when No error", data);
      }
      // console.log("Settled", { data, error });
    },
  });

  // useEffect(() => {
  //   setError(minterror);
  // }, [minterror]);

  useEffect(() => {
    // console.log(
    //   "Data TokenID:",
    //   TokenID
    //   // parseInt(BalOfCurrUser._hex, 16) / 10 ** 5
    // );
    const getNftOwnData = async () => {
      await TokenID;
      if (TokenID != undefined) {
        setSuccess("Transaction generated at: " + TokenID.hash);
      }
      console.log("Sucnccesss: ", TokenID);
    };
    getNftOwnData().catch(console.error);
  }, [TokenID]);

  useEffect(() => {
    console.log(
      "Data mintisSuccess:",
      mintisSuccess
      // parseInt(BalOfCurrUser._hex, 16) / 10 ** 5
    );
  }, [mintisSuccess]);

  // useEffect(() => {
  //   console.log(
  //     "Data TokenID:",
  //     TokenID
  //     // parseInt(BalOfCurrUser._hex, 16) / 10 ** 5
  //   );
  // }, [TokenID]);

  // useEffect(() => {
  //   console.log(
  //     "Data TokenID TokenError:",
  //     TokenError
  //     // parseInt(BalOfCurrUser._hex, 16) / 10 ** 5
  //   );
  // }, [TokenError]);

  useEffect(() => {
    console.log(
      "Data TokenID mintstatus:",
      mintstatus
      // parseInt(BalOfCurrUser._hex, 16) / 10 ** 5
    );
  }, [mintstatus]);

  async function handleMintingNFT() {
    console.log("hanfde NFT MINT");
    // const claimingAddress = keccak256(currentUser);
    // const hexProof = merkleTree.getHexProof(claimingAddress);
    // console.log("hexProof:", [...hexProof]);
    // mintToken({
    //   args: [hexProof],
    // });
    mintToken({});
  }

  const {
    data: AppovalWritedata,
    isSuccess,
    write: AppovalWrite,
  } = useContractWrite({
    ...RewardingToken,
    functionName: "approve",
    args: [NFTContract.address, BalOfCurrUser],
  });

  async function handleApproval() {
    console.log(" Approval Handle called from button click");
    AppovalWrite({});
  }

  useEffect(() => {
    console.log(
      "Data AppovalWritedata:",
      AppovalWritedata
      // parseInt(AppovalWriteData._hex, 16) / 10 ** 5
    );
  }, [isSuccess]);

  // async function whitelisthandler() {
  // if (
  //   typeof window.ethereum !== "undefined" ||
  //   typeof window.web3 !== "undefined"
  // ) {
  //   // Web3 browser user detected. You can now use the provider.
  //   // const accounts = await window.ethereum.enable();
  //   const accounts = await window.ethereum.request({
  //     method: "eth_requestAccounts",
  //   });
  //   // const curProvider = window['ethereum'] || window.web3.currentProvider
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const walletAddress = accounts[0];
  //   const signer = provider.getSigner(walletAddress);
  //   console.log("accounts: ", accounts);
  //   console.log("provider: ", provider);
  //   const NFTContractSigner = new ethers.Contract(
  //     NFTContractaddress,
  //     NFTContract_ABI,
  //     signer
  //   );
  //   console.log("Adding to white list");
  //   const claimingAddress = keccak256(accounts[0]);
  //   const hexProof = merkleTree.getHexProof(claimingAddress);
  //   console.log("hexProof: " + [...hexProof]);
  //   // const claimingAddress = keccak256("0X5B38DA6A701C568545DCFCB03FCB875F56BEDDD6");
  //   // const addtoWhitlelist_tx = await NFTContractSigner.whitelistMint(
  //   //   hexProof
  //   // );
  //   console.log("Add to whitelist", addtoWhitlelist_tx);
  // }
  // }
  // async function hand
  useEffect(() => {
    async function MerkleHash() {
      if (currentUser != null) {
        const leafNodes = whitelistAddresses.map((addr) => keccak256(addr));
        const merkleTree = new MerkleTree(leafNodes, keccak256, {
          sortPairs: true,
        });

        const claimingAddress = keccak256(currentUser);
        const calculatedHexProof = merkleTree.getHexProof(claimingAddress);
        setHexProof(calculatedHexProof);
        // console.log("My Collection hexProof:", [...hexProof]);
      }
    }
    MerkleHash();
  }, [currentUser]);

  return currentUser != null || currentUser != undefined ? (
    <div style={{ align: "center", padding: "2em" }}>
      <h3 style={{ color: "#267aa4" }}>Use Reward Tokens to Mint Dev Nfts</h3>
      <h4>
        Rewarding Tokens :{" "}
        {rewardingBal != undefined || rewardingBal != null
          ? parseInt(rewardingBal._hex, 16) / 10 ** 18
          : 0}
      </h4>
      <hr />
      <b>Current Minting State:</b>
      {mintingState === 0 && (
        <>
          <span>Minting hasn't Started Yet</span>
          {Owner === currentUser && (
            <div>
              <Button
                style={{ backgroundColor: "#15cdfc" }}
                onClick={handleStartPreSale}
              >
                {" "}
                Start Presale
              </Button>
            </div>
          )}
        </>
      )}
      {mintingState === 1 && (
        <span>
          <span>Pre-Sale</span>
          <br />
          {Owner === currentUser && (
            <div>
              <br />
              End Pre-Sale to Start Public Sale{"   : "}
              <Button
                style={{ backgroundColor: "#15cdfc" }}
                onClick={handleEndPreSale}
              >
                {" "}
                End Presale
              </Button>
            </div>
          )}
        </span>
      )}
      {mintingState === 2 && <span>Public Sale</span>}
      {!Approval && (
        <div>
          <hr />
          <div>
            <div>
              Approve This Website(NFT Contract) To transfer your RewardTokens{" "}
            </div>
            <Button
              style={{ backgroundColor: "#15cdfc" }}
              className="button"
              onClick={handleApproval}
            >
              Approve
            </Button>
          </div>
        </div>
      )}
      <hr />
      {mintingState !== 0 && Approval && (
        <>
          <p>Mint NFT :</p>

          <Button
            style={{ backgroundColor: "#15cdfc" }}
            onClick={() => {
              // alert("minting token" + currentUser);
              handleMintingNFT();
            }}
          >
            Mint Token
          </Button>

          {Displayerror.length > 0 && (
            <div style={{ backgroundColor: "red" }}>{Displayerror}</div>
          )}
          {DisplaySuccess && (
            <div style={{ backgroundColor: "green" }}>{DisplaySuccess}</div>
          )}
        </>
      )}
    </div>
  ) : (
    <div style={{ textAlign: "center" }}>
      <div style={{ align: "center", padding: "2em" }}>
        <h3 style={{ color: "#267aa4" }}>Use Reward Tokens to Mint Dev Nfts</h3>
        <h4>Connect your Wallet to Start Minting</h4>
        <div>Kindly Connect to Binance Smart Chain (TestNet)</div>
      </div>
    </div>
  );
  // }
};
export default NFTminting;
