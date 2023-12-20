const Exam = require('../models/examModel');

const createExam = async (req, res) => {
  try {
    const { title, duration } = req.body;
    const newExam = new Exam({ title, duration });
    await newExam.save();
    res.status(201).json(newExam);
  } catch (error) {
    console.error('Error creating exam:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.status(200).json(exams);
  } catch (error) {
    console.error('Error fetching exams:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    res.status(200).json(exam);
  } catch (error) {
    console.error('Error fetching exam by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateExamById = async (req, res) => {
  try {
    const { title, duration } = req.body;
    const updatedExam = await Exam.findByIdAndUpdate(
      req.params.id,
      { title, duration },
      { new: true } 
    );
    if (!updatedExam) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    res.status(200).json(updatedExam);
  } catch (error) {
    console.error('Error updating exam by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteExamById = async (req, res) => {
  try {
    const deletedExam = await Exam.findByIdAndDelete(req.params.id);
    if (!deletedExam) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting exam by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createExam,
  getAllExams,
  getExamById,
  updateExamById,
  deleteExamById,
};
