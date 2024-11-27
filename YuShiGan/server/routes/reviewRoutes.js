const express = require('express');
const { getReviews } = require('../controllers/reviewController.js');
const router = express.Router();

router.post('/get-reviews', getReviews);

module.exports = router;
