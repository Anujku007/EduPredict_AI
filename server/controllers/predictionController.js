const Prediction = require('../models/Prediction');
const { predictMathScore } = require('../services/mlInferenceService');

const createPrediction = async (req, res, next) => {
  try {
    const {
      studentLabel,
      gender,
      raceEthnicity,
      parentalLevelOfEducation,
      lunch,
      testPreparationCourse,
      readingScore,
      writingScore,
    } = req.body;

    if (
      !gender ||
      !raceEthnicity ||
      !parentalLevelOfEducation ||
      !lunch ||
      !testPreparationCourse ||
      readingScore === undefined ||
      writingScore === undefined
    ) {
      return res.status(400).json({ message: 'All student assessment fields are required' });
    }

    const inference = await predictMathScore({
      gender,
      raceEthnicity,
      parentalLevelOfEducation,
      lunch,
      testPreparationCourse,
      readingScore: Number(readingScore),
      writingScore: Number(writingScore),
    });

    const record = await Prediction.create({
      user: req.user._id,
      studentLabel: studentLabel || req.user.name,
      gender,
      raceEthnicity,
      parentalLevelOfEducation,
      lunch,
      testPreparationCourse,
      readingScore: Number(readingScore),
      writingScore: Number(writingScore),
      ...inference,
    });

    res.status(201).json(record);
  } catch (error) {
    next(error);
  }
};

const getMyPredictions = async (req, res, next) => {
  try {
    const filter = req.user.role === 'educator' ? {} : { user: req.user._id };
    const predictions = await Prediction.find(filter)
      .populate('user', 'name email role')
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(predictions);
  } catch (error) {
    next(error);
  }
};

const getAnalyticsSummary = async (req, res, next) => {
  try {
    const matchStage = req.user.role === 'educator' ? {} : { user: req.user._id };

    const [stats, bandBreakdown, prepComparison] = await Promise.all([
      Prediction.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: null,
            totalPredictions: { $sum: 1 },
            avgMathScore: { $avg: '$predictedMathScore' },
            avgReadingScore: { $avg: '$readingScore' },
            avgWritingScore: { $avg: '$writingScore' },
          },
        },
      ]),
      Prediction.aggregate([
        { $match: matchStage },
        { $group: { _id: '$riskBand', count: { $sum: 1 } } },
      ]),
      Prediction.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: '$testPreparationCourse',
            avgMath: { $avg: '$predictedMathScore' },
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    res.json({
      overview: stats[0] || {
        totalPredictions: 0,
        avgMathScore: 0,
        avgReadingScore: 0,
        avgWritingScore: 0,
      },
      bandBreakdown,
      prepComparison,
    });
  } catch (error) {
    next(error);
  }
};

const deletePrediction = async (req, res, next) => {
  try {
    const pred = await Prediction.findById(req.params.id);
    if (!pred) {
      return res.status(404).json({ message: 'Prediction record not found' });
    }
    if (pred.user.toString() !== req.user._id.toString() && req.user.role !== 'educator') {
      return res.status(403).json({ message: 'Not authorized to delete this record' });
    }
    await pred.deleteOne();
    res.json({ message: 'Prediction record deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPrediction,
  getMyPredictions,
  getAnalyticsSummary,
  deletePrediction,
};
