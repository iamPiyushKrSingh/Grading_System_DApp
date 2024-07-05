import React from "react";

const ConnectContract = ({ initializeContract, contract }) => {
  return (
    <div>
      {contract ? (
        <p>Connected to contract at address : {contract.target}</p>
      ) : (
        <button onClick={initializeContract}>Connect Contract</button>
      )}
    </div>
  );
};

export default ConnectContract;
