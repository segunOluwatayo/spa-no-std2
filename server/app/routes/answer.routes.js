const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answer.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware, answerController.createAnswer);
router.get('/question/:questionId', answerController.getAnswers);
router.put('/:id', authMiddleware, answerController.updateAnswer);
router.delete('/:id', authMiddleware, answerController.deleteAnswer);
router.post('/:id/upvote', authMiddleware, answerController.upvoteAnswer);

module.exports = router;