const express = require('express');
const router = express.Router();
const {
  createPrediction,
  getMyPredictions,
  getAnalyticsSummary,
  deletePrediction,
} = require('../controllers/predictionController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createPrediction);
router.get('/', protect, getMyPredictions);
router.get('/analytics', protect, getAnalyticsSummary);
router.delete('/:id', protect, deletePrediction);

module.exports = router;
