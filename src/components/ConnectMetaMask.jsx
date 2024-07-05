import React from "react";

const ConnectMetaMask = ({ initializeUser, user }) => {
  return (
    <div>
      {!user && <button onClick={initializeUser}>Connect MetaMask</button>}
    </div>
  );
};

export default ConnectMetaMask;
