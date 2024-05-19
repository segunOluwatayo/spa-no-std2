const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/rating.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/answer/:id', authMiddleware, ratingController.rateAnswer);

module.exports = router;