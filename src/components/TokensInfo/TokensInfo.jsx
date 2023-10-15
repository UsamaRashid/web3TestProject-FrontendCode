import React, { useEffect } from "react";

import { RewardingToken, StakingToken } from "../wagmiConfigurations";
import { useContractRead } from "wagmi";

const TokensInfo = ({ currentUser }) => {
  // Reading StakingToken Balance From Contract
  const { data: stakingBal } = useContractRead({
    ...StakingToken,
    functionName: "balanceOf",
    args: [currentUser],
  });
  useEffect(() => {
    console.log("Data now staking:", stakingBal);
  }, [stakingBal]);

  // Reading RewardingToken Balance From Contract
  const { data: rewardingBal } = useContractRead({
    ...RewardingToken,
    functionName: "balanceOf",
    args: [currentUser],
  });
  useEffect(() => {
    console.log("Data now rewarding:", rewardingBal);
  }, [rewardingBal]);

  return currentUser != null || currentUser !== undefined ? (
    <div style={{ align: "center", padding: "2em" }}>
      <h3 style={{ color: "#267aa4" }}>
        <b>Your Currently Owned Tokens </b>
      </h3>
      <div>
        <h4>
          Staking Tokens :{" "}
          {stakingBal !== undefined || stakingBal != null
            ? parseInt(stakingBal._hex, 16) / 10 ** 18
            : 0}
        </h4>
        <h4>
          Rewarding Tokens : {rewardingBal === "undefined" && 0}
          {rewardingBal && parseInt(rewardingBal._hex, 16) / 10 ** 18}
        </h4>
      </div>
    </div>
  ) : (
    <div style={{ textAlign: "center" }}>
      <h4>Connect your Wallet to see Tokens Infos</h4>
      <div>Kindly Connect to Binance Smart Chain (TestNet)</div>
    </div>
  );
};

export default TokensInfo;
