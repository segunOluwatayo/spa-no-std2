const Question = require('../models/question.model');
const { calculateQuestionRating, upvoteQuestion } = require('../utils/rating.utils');

// Create a new question
exports.createQuestion = async (req, res) => {
  try {
    const { title, description } = req.body;
    const question = new Question({
      title,
      description,
      author: req.user._id,
    });
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Error creating question', error });
  }
};

// Upvote a question
exports.upvoteQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;
    const userId = req.user._id;
    await upvoteQuestion(questionId, userId);
    res.json({ message: 'Question upvoted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error upvoting question', error });
  }
};

// Get all questions
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate('author', 'name');
    res.json(questions);
    } catch (error) {
    res.status(500).json({ message: 'Error getting questions', error });
    }
    };
    
    // Get a single question
    exports.getQuestion = async (req, res) => {
    try {
    const question = await Question.findById(req.params.id).populate('author', 'name');
    if (!question) {
    return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
    } catch (error) {
    res.status(500).json({ message: 'Error getting question', error });
    }
    };

    // Get a single question with rating
exports.getQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate('author', 'name');
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    const rating = await calculateQuestionRating(question._id);
    res.json({ ...question.toObject(), rating });
  } catch (error) {
    res.status(500).json({ message: 'Error getting question', error });
  }
};
    
    // Update a question
    exports.updateQuestion = async (req, res) => {
    try {
    const { title, description } = req.body;
    const question = await Question.findOneAndUpdate(
    { _id: req.params.id, author: req.user._id },
    { title, description },
    { new: true }
    );
    if (!question) {
    return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
    } catch (error) {
    res.status(500).json({ message: 'Error updating question', error });
    }
    };
    
    // Delete a question
    exports.deleteQuestion = async (req, res) => {
    try {
    const question = await Question.findOneAndDelete({
    _id: req.params.id,
    author: req.user._id,
    });
    if (!question) {
    return res.status(404).json({ message: 'Question not found' });
    }
    res.json({ message: 'Question deleted successfully' });
    } catch (error) {
    res.status(500).json({ message: 'Error deleting question', error });
    }
    };
    