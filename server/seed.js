const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Prediction = require('./models/Prediction');

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    await Promise.all([User.deleteMany({}), Prediction.deleteMany({})]);

    const educator = await User.create({
      name: 'Dr. Meera Krishnan',
      email: 'educator@demo.com',
      password: 'Password123!',
      role: 'educator',
      institution: 'Dr. Ambedkar Institute of Technology',
    });

    const student = await User.create({
      name: 'Anuj Kumar',
      email: 'student@demo.com',
      password: 'Password123!',
      role: 'student',
      institution: 'Dr. Ambedkar Institute of Technology',
    });

    await Prediction.insertMany([
      {
        user: student._id,
        studentLabel: 'Anuj Kumar — Midterm Diagnostic',
        gender: 'male',
        raceEthnicity: 'group D',
        parentalLevelOfEducation: "bachelor's degree",
        lunch: 'standard',
        testPreparationCourse: 'completed',
        readingScore: 84,
        writingScore: 82,
        predictedMathScore: 87.9,
        riskBand: 'High Performer',
        inferenceEngine: 'calibrated-js-fallback',
        recommendations: [
          'Strong quantitative trajectory—consider advanced STEM placement or peer mentoring.',
        ],
      },
      {
        user: educator._id,
        studentLabel: 'Cohort Sample #102',
        gender: 'female',
        raceEthnicity: 'group B',
        parentalLevelOfEducation: 'some college',
        lunch: 'free/reduced',
        testPreparationCourse: 'none',
        readingScore: 58,
        writingScore: 55,
        predictedMathScore: 47.2,
        riskBand: 'Needs Support',
        inferenceEngine: 'calibrated-js-fallback',
        recommendations: [
          'Schedule foundational quantitative workshops focusing on algebra and problem-solving speed.',
          'Enrolling in a structured test-preparation course historically lifts composite scores by 5–8 points.',
        ],
      },
      {
        user: educator._id,
        studentLabel: 'Cohort Sample #103',
        gender: 'female',
        raceEthnicity: 'group C',
        parentalLevelOfEducation: "associate's degree",
        lunch: 'standard',
        testPreparationCourse: 'completed',
        readingScore: 74,
        writingScore: 76,
        predictedMathScore: 67.6,
        riskBand: 'On Track',
        inferenceEngine: 'calibrated-js-fallback',
        recommendations: [
          'Target timed practice sets to convert solid conceptual understanding into top-decile accuracy.',
        ],
      },
    ]);

    console.log('Database seeded successfully!');
    console.log('Educator login -> educator@demo.com / Password123!');
    console.log('Student login  -> student@demo.com / Password123!');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

seedData();
