import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User/User.js';
import bcrypt from 'bcrypt';

dotenv.config();

const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    },
  );

  return token;
};

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  const tokenString = token?.split(' ')[1];

  if (!tokenString) {
    return res
      .status(401)
      .json({ msg: '[⚡️]: Hello There! You do not have a token. Authorization denied.' });
  }

  try {
    const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    res
      .status(400)
      .json({ msg: ' [⚡️]: Hello There! You do not have a valid token. Authorization denied.' });
  }
};

export { generateToken, verifyToken };
