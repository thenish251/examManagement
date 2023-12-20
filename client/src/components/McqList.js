import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './McqList.css'; // Import your CSS file

const McqList = ({ examId }) => {
  const [mcqs, setMCQs] = useState([]);
  const [newMCQQuestion, setNewMCQQuestion] = useState('');
  const [newMCQOptions, setNewMCQOptions] = useState([]);
  const [newMCQCorrectAnswer, setNewMCQCorrectAnswer] = useState('');

  useEffect(() => {
    // Fetch MCQs for a specific exam from the server on component mount
    fetchMCQs();
  }, [examId]); // Trigger fetchMCQs when examId changes

  const fetchMCQs = () => {
    axios.get(`http://localhost:3000/mcqs/exam/${examId}`)
      .then(response => setMCQs(response.data))
      .catch(error => console.error('Error fetching MCQs:', error));
  };

  const handleAddMCQ = () => {
    // Implement logic to add a new MCQ for the specific exam
    axios.post('http://localhost:3000/mcqs', {
      question: newMCQQuestion,
      options: newMCQOptions,
      correctAnswer: newMCQCorrectAnswer,
      examId: examId,
    })
      .then(response => {
        setMCQs([...mcqs, response.data]);
        setNewMCQQuestion('');
        setNewMCQOptions([]);
        setNewMCQCorrectAnswer('');
      })
      .catch(error => console.error('Error adding MCQ:', error));
  };

  const handleDeleteMCQ = (mcqId) => {
    // Implement logic to delete an MCQ
    axios.delete(`http://localhost:3000/mcqs/${mcqId}`)
      .then(() => {
        setMCQs(mcqs.filter(mcq => mcq._id !== mcqId));
      })
      .catch(error => console.error('Error deleting MCQ:', error));
  };

  return (
    <div className="mcq-list-container">
      <h2>MCQ List for Exam {examId}</h2>
      <ul className="mcq-list">
        {mcqs.map(mcq => (
          <li key={mcq._id} className="mcq-item">
            {mcq.question} - Correct Answer: {mcq.correctAnswer}
            <button onClick={() => handleDeleteMCQ(mcq._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="add-mcq-form">
        <h3>Add New MCQ</h3>
        <input
          type="text"
          placeholder="Question"
          value={newMCQQuestion}
          onChange={(e) => setNewMCQQuestion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Options (comma-separated)"
          value={newMCQOptions}
          onChange={(e) => setNewMCQOptions(e.target.value.split(','))}
        />
        <input
          type="text"
          placeholder="Correct Answer"
          value={newMCQCorrectAnswer}
          onChange={(e) => setNewMCQCorrectAnswer(e.target.value)}
        />
        <button onClick={handleAddMCQ}>Add MCQ</button>
      </div>
    </div>
  );
};

export default McqList;
