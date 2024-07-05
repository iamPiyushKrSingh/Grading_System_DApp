import React from "react";
import { useState } from "react";

const GetGrades = ({ getGrades }) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [Grade, setGrade] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setGrade(getGrades(name, subject));
    setName("");
    setSubject("");
  };
  return (
    <div>
      <h1>Get Grades</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="studentName">Student Name</label>
        <input
          type="text"
          id="studentName"
          name="studentName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />

        <button type="submit">Get Grade</button>
      </form>

      {Grade ? <h2>{Grade}</h2> : null}
    </div>
  );
};

export default GetGrades;
