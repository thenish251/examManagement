import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './McqList.css'; // Import your CSS file

const McqList = ({ examId }) => {
  const [mcqs, setMCQs] = useState([]);
  const [newMCQQuestion, setNewMCQQuestion] = useState('');
  const [newMCQOptions, setNewMCQOptions] = useState('');
  const [newMCQCorrectAnswer, setNewMCQCorrectAnswer] = useState('');
  const [editingMCQ, setEditingMCQ] = useState(null);

  const fetchMCQs = useCallback(() => {
    axios.get(`http://localhost:3000/mcqs/exam/${examId}`)
      .then(response => setMCQs(response.data))
      .catch(error => console.error('Error fetching MCQs:', error));
  }, [examId]);

  useEffect(() => {
    // Fetch MCQs for a specific exam from the server on component mount
    fetchMCQs();
  }, [fetchMCQs, examId]);

  const handleEditMCQ = (mcqId) => {
    // Set the editingMCQ state to the MCQ ID being edited
    setEditingMCQ(mcqId);
  };

  const handleSaveEdit = () => {
    // Implement logic to save the edited MCQ
    // This is a placeholder; you should customize it according to your requirements
    console.log(`Save edited MCQ with ID: ${editingMCQ}`);
    // Reset the editing state
    setEditingMCQ(null);
    // Fetch MCQs after editing
    fetchMCQs();
  };

  const handleCancelEdit = () => {
    // Cancel editing by resetting the editing state
    setEditingMCQ(null);
  };

  const handleAddMCQ = () => {
    // Implement logic to add a new MCQ for the specific exam
    axios.post(`http://localhost:3000/mcqs/exam/${examId}/mcqs`, {
      question: newMCQQuestion,
      options: newMCQOptions.split(',').map(option => option.trim()),
      correctAnswer: newMCQCorrectAnswer,
    })
      .then(response => {
        setMCQs([...mcqs, response.data]);
        setNewMCQQuestion('');
        setNewMCQOptions('');
        setNewMCQCorrectAnswer('');
      })
      .catch(error => console.error('Error adding MCQ:', error));
  };

  const handleDeleteMCQ = (mcqId) => {
    // Implement logic to delete an MCQ
    axios.delete(`http://localhost:3000/mcqs/${mcqId}`)
      .then(() => {
        setMCQs(mcqs.filter(mcq => mcq._id !== mcqId));
        // Reset editing state after deletion
        setEditingMCQ(null);
      })
      .catch(error => console.error('Error deleting MCQ:', error));
  };

  return (
    <div>
      <h2>MCQ List for Exam {examId}</h2>
      <ul>
        {mcqs.map(mcq => (
          <li key={mcq._id}>
            {mcq.question} - Correct Answer: {mcq.correctAnswer}
            {editingMCQ === mcq._id ? (
              <div>
                {/* Modal for editing */}
                <input
                  type="text"
                  placeholder="Edit Question"
                  value={newMCQQuestion}
                  onChange={(e) => setNewMCQQuestion(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Edit Options (comma-separated)"
                  value={newMCQOptions}
                  onChange={(e) => setNewMCQOptions(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Edit Correct Answer"
                  value={newMCQCorrectAnswer}
                  onChange={(e) => setNewMCQCorrectAnswer(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <button onClick={() => handleEditMCQ(mcq._id)}>Edit</button>
                <button onClick={() => handleDeleteMCQ(mcq._id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div>
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
          onChange={(e) => setNewMCQOptions(e.target.value)}
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
