const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { getJobRecommendations } = require('../controllers/jobController');

// Job recommendations route
router.get('/recommendations', auth, getJobRecommendations);

module.exports = router; 