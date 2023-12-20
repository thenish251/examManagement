const express = require('express');
const router = express.Router();
const mcqController = require('../controllers/mcqController');

// Create a new MCQ
router.post('/', mcqController.createMCQ);

// Get all MCQs for a specific exam
router.get('/exam/:examId', mcqController.getAllMCQsForExam);

// Get a specific MCQ by ID
router.get('/:id', mcqController.getMCQById);

// Update a specific MCQ by ID
router.put('/:id', mcqController.updateMCQById);

// Delete a specific MCQ by ID
router.delete('/:id', mcqController.deleteMCQById);

module.exports = router;
