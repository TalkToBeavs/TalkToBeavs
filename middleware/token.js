import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import client from '../models/prisma/prisma.js';
dotenv.config();

const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,

      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    },
  );

  return token;
};
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  const tokenString = token?.split(' ')[1];


  if (!token) {
    console.error(err)
    return res
      .status(401)
      .json({ msg: '[⚡️]: Hello There! You do not have a token. Authorization denied.' });
  }

  try {
    const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
    const user = await client.user.findUnique({
      where: {
        id: decoded.id
      },
      select: {
        id: true,
        name: true,
        email: true,
      }
    });
    if (!user) {
      return res.status(401).json({ msg: '[⚡️]: User not found. Authorization denied.' });
    }

    req.user = user;
    next();

  } catch (err) {
    console.error(err)
    res
      .status(400)
      .json({ msg: ' [⚡️]: Hello There! You do not have a valid token. Authorization denied.' });
  }
};

export { generateToken, verifyToken };
