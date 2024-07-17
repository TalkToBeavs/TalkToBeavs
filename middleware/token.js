import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import User from '../models/User/User.js';
// import client from "../../TalkToBeavs/models/prisma/prisma"
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
    return res
      .status(401)
      .json({ msg: '[⚡️]: Hello There! You do not have a token. Authorization denied.' });
  }

  try {
    const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
    const user = await client.User.findUnique({
      where: {
        id: decoded.id
      },
      select: {
        id: true,
        username: true,
        email: true,
      }
    });
    if (!user) {
      return res.status(401).json({ msg: '[⚡️]: User not found. Authorization denied.' });
    }

    req.user = user;
    next();

  } catch (err) {
    res
      .status(400)
      .json({ msg: ' [⚡️]: Hello There! You do not have a valid token. Authorization denied.' });
  }
};

export { generateToken, verifyToken };
