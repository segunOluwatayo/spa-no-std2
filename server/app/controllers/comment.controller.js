const Comment = require('../models/comment.model');

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const { content, answerId } = req.body;
    const comment = new Comment({
      content,
      author: req.userId,
      answer: answerId,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating comment', error });
  }
};

// Get all comments for an answer
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ answer: req.params.answerId })
      .populate('author', 'name')
      .populate('answer', 'content');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error getting comments', error });
  }
};

// Update a comment
exports.updateComment = async (req, res) => {
  try {
    const { content } = req.body;
    const comment = await Comment.findOneAndUpdate(
      { _id: req.params.id, author: req.userId },
      { content },
      { new: true }
    );
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment', error });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({
      _id: req.params.id,
      author: req.userId,
    });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment', error });
  }
};