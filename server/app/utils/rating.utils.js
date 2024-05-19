const Question = require('../models/question.model');
const Answer = require('../models/answer.model');

// Calculate the average rating for a question
const calculateQuestionRating = async (questionId) => {
  const question = await Question.findById(questionId);
  const answers = await Answer.find({ question: questionId });

  if (answers.length === 0) {
    return 0;
  }

  const totalRating = answers.reduce((sum, answer) => sum + answer.rating, 0);
  const averageRating = totalRating / answers.length;

  question.rating = averageRating;
  await question.save();

  return averageRating;
};

// Calculate the average rating for an answer
const calculateAnswerRating = async (answerId) => {
  const answer = await Answer.findById(answerId);
  const ratings = answer.ratings;

  if (ratings.length === 0) {
    return 0;
  }

  const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
  const averageRating = totalRating / ratings.length;

  answer.rating = averageRating;
  await answer.save();

  return averageRating;
};

module.exports = {
  calculateQuestionRating,
  calculateAnswerRating,
};