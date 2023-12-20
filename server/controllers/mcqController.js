const MCQ = require('../models/mcqModel');

const createMCQ = async (req, res) => {
  try {
    const { question, options, correctAnswer, examId } = req.body;
    const newMCQ = new MCQ({ question, options, correctAnswer, exam: examId });
    await newMCQ.save();
    res.status(201).json(newMCQ);
  } catch (error) {
    console.error('Error creating MCQ:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllMCQsForExam = async (req, res) => {
  try {
    const mcqs = await MCQ.find({ exam: req.params.examId });
    res.status(200).json(mcqs);
  } catch (error) {
    console.error('Error fetching MCQs for exam:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getMCQById = async (req, res) => {
  try {
    const mcq = await MCQ.findById(req.params.id);
    if (!mcq) {
      return res.status(404).json({ error: 'MCQ not found' });
    }
    res.status(200).json(mcq);
  } catch (error) {
    console.error('Error fetching MCQ by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateMCQById = async (req, res) => {
  try {
    const { question, options, correctAnswer } = req.body;
    const updatedMCQ = await MCQ.findByIdAndUpdate(
      req.params.id,
      { question, options, correctAnswer },
      { new: true } 
    );
    if (!updatedMCQ) {
      return res.status(404).json({ error: 'MCQ not found' });
    }
    res.status(200).json(updatedMCQ);
  } catch (error) {
    console.error('Error updating MCQ by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a specific MCQ by ID
const deleteMCQById = async (req, res) => {
  try {
    const deletedMCQ = await MCQ.findByIdAndDelete(req.params.id);
    if (!deletedMCQ) {
      return res.status(404).json({ error: 'MCQ not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting MCQ by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createMCQ,
  getAllMCQsForExam,
  getMCQById,
  updateMCQById,
  deleteMCQById,
};
