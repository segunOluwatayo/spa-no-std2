const Answer = require('../models/answer.model');
const { calculateAnswerRating, upvoteAnswer } = require('../utils/rating.utils');

exports.createAnswer = async (req, res) => {
  try {
    const { content, questionId } = req.body;

    if (!questionId) {
      return res.status(400).json({ message: 'Question ID is required' });
    }

    const answer = new Answer({
      content,
      author: req.user._id,
      question: questionId,
    });

    await answer.save();
    res.status(201).json(answer);
  } catch (error) {
    console.error('Error creating answer:', error);
    res.status(500).json({ message: 'Error creating answer', error });
  }
};


// Upvote an answer
exports.upvoteAnswer = async (req, res) => {
  try {
    const answerId = req.params.id;
    const userId = req.user._id;
    await upvoteAnswer(answerId, userId);
    res.json({ message: 'Answer upvoted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error upvoting answer', error });
  }
};

// Get all answers for a question
exports.getAnswers = async (req, res) => {
  try {
    const answers = await Answer.find({ question: req.params.questionId })
      .populate('author', 'name')
      .populate('question', 'title');
    res.json(answers);
  } catch (error) {
    res.status(500).json({ message: 'Error getting answers', error });
  }
};

// Get all answers for a question with rating
exports.getAnswers = async (req, res) => {
  try {
    const answers = await Answer.find({ question: req.params.questionId })
      .populate('author', 'name')
      .populate('question', 'title');
    const answersWithRating = await Promise.all(
      answers.map(async (answer) => {
        const rating = await calculateAnswerRating(answer._id);
        return { ...answer.toObject(), rating };
      })
    );
    res.json(answersWithRating);
  } catch (error) {
    res.status(500).json({ message: 'Error getting answers', error });
  }
};

// Update an answer
exports.updateAnswer = async (req, res) => {
  try {
    const { content } = req.body;
    const answer = await Answer.findOneAndUpdate(
      { _id: req.params.id, author: req.userId },
      { content },
      { new: true }
    );
    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    res.json(answer);
  } catch (error) {
    res.status(500).json({ message: 'Error updating answer', error });
  }
};

// Delete an answer
exports.deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findOneAndDelete({
      _id: req.params.id,
      author: req.userId,
    });
    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    res.json({ message: 'Answer deleted successfully' });
  } catch (error) {
    res.status (500).json({ message: 'Error deleting answer', error });
}
};