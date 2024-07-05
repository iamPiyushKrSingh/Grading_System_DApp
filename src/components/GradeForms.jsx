import React, { useState } from "react";

const GradeForm = ({ addGrade, useCase }) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    addGrade(name, subject, grade);
    setName("");
    setSubject("");
    setGrade(0);
  };

  return (
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

      <label htmlFor="grade">Grade</label>
      <input
        type="number"
        id="grade"
        name="grade"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        required
      />

      <button type="submit">{useCase}</button>
    </form>
  );
};

export default GradeForm;
