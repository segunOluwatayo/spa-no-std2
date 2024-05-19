const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  rating: { type: Number, default: 0 },
  ratings: [{ type: Number, default: 0}],
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;