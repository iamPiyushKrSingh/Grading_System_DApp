import { ethers } from "ethers";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import { ABI } from "./utils/abi";
import ConnectMetaMask from "./components/ConnectMetaMask";
import ConnectContract from "./components/ConnectContract";
import GradeForm from "./components/GradeForms";
import Navbar from "./components/Navbar";

const contactAddress = process.env.REACT_APP_CONTACT_ADDRESS;

function App() {
  const [grades, setGrades] = useState([]);

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

  const loadGrades = async (contract) => {
    try {
      const GradesArray = [];
      const len = await contract.grades().length;
      for (let i = 0; i < len; i++) {
        const grade = await contract.grades(i);
        GradesArray.push({
          studentName: grade.studentName,
          subject: grade.subject,
          grade: grade.grade,
        });
      }
      setGrades(GradesArray);
    } catch (error) {
      console.error(error);
    }
  };

  const addGrade = async (studentName, subject, grade) => {
    try {
      const tx = await contract.addGrade(studentName, subject, parseInt(grade));
      await tx.wait();
      loadGrades(contract);
      console.log(grades);
    } catch (error) {
      console.error(error);
    }
  };

  const updateGrade = async (studentName, subject, grade) => {
    try {
      const tx = await contract.updateGrade(
        studentName,
        subject,
        parseInt(grade)
      );
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
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <h1>Grading System</h1>
              <h2>IISER Kolkata</h2>
              <h3>Add Grade</h3>
              <ConnectMetaMask initializeUser={initializeUser} user={user} />
              <ConnectContract
                initializeContract={initializeContract}
                contract={contract}
              />
              <GradeForm addGrade={addGrade} useCase="Add Grade" />
            </div>
          }
        />

        <Route
          path="/update"
          element={
            <div className="App">
              <h1>Grading System</h1>
              <h2>IISER Kolkata</h2>
              <h3>Update Grade</h3>
              <ConnectMetaMask initializeUser={initializeUser} user={user} />
              <ConnectContract
                initializeContract={initializeContract}
                contract={contract}
              />
              <GradeForm addGrade={updateGrade} useCase="Update Grade" />
            </div>
          }
        />

        <Route
          path="/view"
          element={
            <div className="App">
              <h1>Grading System</h1>
              <h2>IISER Kolkata</h2>
              <ConnectMetaMask initializeUser={initializeUser} user={user} />
              <ConnectContract
                initializeContract={initializeContract}
                contract={contract}
              />
              <ul>
                {grades.map((grade, index) => (
                  <li key={index}>
                    {grade.studentName} - {grade.subject} - {grade.grade}
                  </li>
                ))}
              </ul>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
