const { getJobRecommendations } = require('../controllers/jobController');

router.get('/recommendations', auth, getJobRecommendations); 