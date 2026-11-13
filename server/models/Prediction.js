const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    studentLabel: { type: String, default: 'Self Assessment' },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    raceEthnicity: {
      type: String,
      enum: ['group A', 'group B', 'group C', 'group D', 'group E'],
      required: true,
    },
    parentalLevelOfEducation: {
      type: String,
      enum: [
        'some high school',
        'high school',
        'some college',
        "associate's degree",
        "bachelor's degree",
        "master's degree",
      ],
      required: true,
    },
    lunch: {
      type: String,
      enum: ['standard', 'free/reduced'],
      required: true,
    },
    testPreparationCourse: {
      type: String,
      enum: ['none', 'completed'],
      required: true,
    },
    readingScore: { type: Number, required: true, min: 0, max: 100 },
    writingScore: { type: Number, required: true, min: 0, max: 100 },
    predictedMathScore: { type: Number, required: true, min: 0, max: 100 },
    riskBand: {
      type: String,
      enum: ['High Performer', 'On Track', 'Needs Support'],
      required: true,
    },
    inferenceEngine: {
      type: String,
      default: 'python-ml-pipeline',
    },
    recommendations: [{ type: String }],
  },
  { timestamps: true }
);

predictionSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Prediction', predictionSchema);
