import { ethers } from "ethers";
import React, { useState } from "react";
import "./App.css";
import { ABI } from "./utils/new";
import ConnectMetaMask from "./components/ConnectMetaMask";
import ConnectContract from "./components/ConnectContract";
import GradeForm from "./components/GradeForms";

const contactAddress = process.env.REACT_APP_CONTACT_ADDRESS;

function App() {
  const [contract, setContract] = useState(null);
  const initializeContract = async () => {
    try {
      if (user) {
        const contractInstance = new ethers.Contract(contactAddress, ABI, user);
        setContract(contractInstance);
      } else {
        console.error("No User found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [user, setUser] = useState(null);
  const initializeUser = async () => {
    try {
      let signer = null;

      let provider;
      if (window.ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults");
        provider = ethers.getDefaultProvider();
      } else {
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        setUser(signer);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [grades, setGrades] = useState([]);

  const addGrade = async (studentName, subject, grade) => {
    try {
      const tx = await contract.addGrade(studentName, subject, parseInt(grade));
      await tx.wait();
      setGrades((prevGrades) => [
        ...prevGrades,
        { studentName: studentName, subject: subject, grade: grade },
      ]);
      console.log(grades);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Grading System</h1>
      <h2>IISER Kolkata</h2>
      <ConnectMetaMask initializeUser={initializeUser} user={user} />
      <ConnectContract
        initializeContract={initializeContract}
        contract={contract}
      />
      <GradeForm addGrade={addGrade} />
    </div>
  );
}

export default App;
