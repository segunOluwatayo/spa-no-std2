const Answer = require('../models/answer.model');

// Rate an answer
exports.rateAnswer = async (req, res) => {
  try {
    const { rating } = req.body;
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }

    answer.rating = rating;
    await answer.save();
    res.json({ message: 'Rating updated successfully', rating: answer.rating });
  } catch (error) {
    res.status(500).json({ message: 'Error rating answer', error });
  }
};