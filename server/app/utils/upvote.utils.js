const Question = require('../models/question.model');
const Answer = require('../models/answer.model');

// Upvote a question
const upvoteQuestion = async (questionId, userId) => {
  const question = await Question.findById(questionId);

  if (question.upvotes.includes(userId)) {
    throw new Error('User has already upvoted this question');
  }

  question.upvotes.push(userId);
  await question.save();
};

// Upvote an answer
const upvoteAnswer = async (answerId, userId) => {
  const answer = await Answer.findById(answerId);

  if (answer.upvotes.includes(userId)) {
    throw new Error('User has already upvoted this answer');
  }

  answer.upvotes.push(userId);
  await answer.save();
};

module.exports = {
  upvoteQuestion,
  upvoteAnswer,
};