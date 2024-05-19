const express = require('express');
const cors = require('cors');
const connectDB = require('./app/config/database');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
// Enable CORS for all routes
app.use(cors());

// Routes
app.use('/api/users', require('./app/routes/user.routes'));
app.use('/api/questions', require('./app/routes/question.routes'));
app.use('/api/answers', require('./app/routes/answer.routes'));
app.use('/api/comments', require('./app/routes/comment.routes'));
// app.use('/api/ratings', require('./app/routes/rating.routes'));

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});