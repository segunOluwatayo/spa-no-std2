const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware, questionController.createQuestion);
router.get('/', questionController.getQuestions);
router.get('/:id', questionController.getQuestion);
router.put('/:id', authMiddleware, questionController.updateQuestion);
router.delete('/:id', authMiddleware, questionController.deleteQuestion);
router.post('/:id/upvote', authMiddleware, questionController.upvoteQuestion);

module.exports = router;