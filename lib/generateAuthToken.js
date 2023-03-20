import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateAuthToken = (id) => {
      return jwt.sign({ _id: id }, process.env.JWT_PRIVATE_KEY);
};

export default generateAuthToken;