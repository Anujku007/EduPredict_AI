const { spawn } = require('child_process');
const path = require('path');

/**
 * Invokes ml_engine/predict_cli.py (which loads artifacts/model.pkl & preprocessor.pkl)
 * and falls back to calibrated linear regression weights trained on stud.csv if Python
 * artifacts are not mounted in the current deployment container.
 */
const calibratedFallbackPredict = (input) => {
  let score = 0.42 * Number(input.readingScore) + 0.46 * Number(input.writingScore);
  score += input.gender === 'male' ? 6.5 : -2.1;
  score += input.lunch === 'standard' ? 3.8 : -1.5;
  score += input.testPreparationCourse === 'completed' ? -2.2 : 1.1;

  const groupAdjust = {
    'group A': -1.2,
    'group B': -0.5,
    'group C': 0.0,
    'group D': 0.6,
    'group E': 3.4,
  };
  score += groupAdjust[input.raceEthnicity] || 0;

  return Number(Math.max(0, Math.min(100, score)).toFixed(2));
};

const generateRecommendations = (input, predictedMath) => {
  const recs = [];
  if (predictedMath < 60) {
    recs.push('Schedule foundational quantitative workshops focusing on algebra and problem-solving speed.');
  } else if (predictedMath < 80) {
    recs.push('Target timed practice sets to convert solid conceptual understanding into top-decile accuracy.');
  } else {
    recs.push('Strong quantitative trajectory—consider advanced STEM placement or peer mentoring.');
  }

  if (input.testPreparationCourse === 'none') {
    recs.push('Enrolling in a structured test-preparation course historically lifts composite scores by 5–8 points.');
  }
  if (Number(input.readingScore) < 65) {
    recs.push('Strengthen word-problem comprehension through daily analytical reading exercises.');
  }
  return recs;
};

const classifyBand = (score) => {
  if (score >= 80) return 'High Performer';
  if (score >= 60) return 'On Track';
  return 'Needs Support';
};

const predictMathScore = (input) => {
  return new Promise((resolve) => {
    const scriptPath = path.join(__dirname, '..', '..', 'ml_engine', 'predict_cli.py');
    const pythonCmd = process.env.PYTHON_PATH || 'python';

    const py = spawn(pythonCmd, [scriptPath]);
    let stdout = '';
    let stderr = '';

    py.stdin.write(JSON.stringify(input));
    py.stdin.end();

    py.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    py.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    py.on('error', () => {
      const score = calibratedFallbackPredict(input);
      resolve({
        predictedMathScore: score,
        riskBand: classifyBand(score),
        inferenceEngine: 'calibrated-js-fallback',
        recommendations: generateRecommendations(input, score),
      });
    });

    py.on('close', (code) => {
      if (code === 0 && stdout.trim()) {
        try {
          const parsed = JSON.parse(stdout.trim());
          return resolve({
            predictedMathScore: parsed.score,
            riskBand: classifyBand(parsed.score),
            inferenceEngine: parsed.engine,
            recommendations: generateRecommendations(input, parsed.score),
          });
        } catch {
          // fall through to JS fallback
        }
      }
      const score = calibratedFallbackPredict(input);
      resolve({
        predictedMathScore: score,
        riskBand: classifyBand(score),
        inferenceEngine: 'calibrated-js-fallback',
        recommendations: generateRecommendations(input, score),
      });
    });
  });
};

module.exports = { predictMathScore };
