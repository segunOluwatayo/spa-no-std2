const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User registration
const registerUser = async (name, email, password) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    const token = jwt.sign({ userId: user._id }, 'your-secret-key');
    user.tokens.push({ token }); // Store the token in the user's tokens array
    await user.save();

    return { user, token };
  } catch (error) {
    throw new Error('Error registering user');
  }
};

// User login
const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user._id }, 'your-secret-key');
    user.tokens.push({ token }); // Store the token in the user's tokens array
    await user.save(); // Save the updated user document

    return { user, token };
  } catch (error) {
    throw new Error('Error logging in');
  }
};

module.exports = {
  registerUser,
  loginUser,
};