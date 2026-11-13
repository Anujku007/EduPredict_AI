const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role, institution } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role === 'educator' ? 'educator' : 'student',
      institution: institution || '',
    });

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        institution: user.institution,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        institution: user.institution,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res) => {
  res.json(req.user);
};

module.exports = { registerUser, loginUser, getMe };
