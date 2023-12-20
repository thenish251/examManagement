const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

// Create a new exam
router.post('/', examController.createExam);

// Get all exams
router.get('/', examController.getAllExams);

// Get a specific exam by ID
router.get('/:id', examController.getExamById);

// Update a specific exam by ID
router.put('/:id', examController.updateExamById);

// Delete a specific exam by ID
router.delete('/:id', examController.deleteExamById);

module.exports = router;
