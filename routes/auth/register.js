import { Router } from 'express';
import joi from 'joi';
// import User from '../../models/User/User.js'
import { genSalt, hash } from 'bcrypt';
const router = Router();
import client from "../../models/prisma/prisma.js"



router.post('/', async (req, res) => {
  const schema = joi.object({
    name: joi.string().required(),
    password: joi.string().required(),
    email: joi.string().pattern(new RegExp('^[a-zA-Z0-9._%+-]+@oregonstate.edu$')).required(),
  });

  try {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(401).json({ message: error.details[0].message });
    }

    const user = await client.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    } else {
      const salt = await genSalt(10);
     const hashedPassword = await hash(req.body.password, salt);
      const newUser = await client.user.create({
        data: {
          name: req.body.name,
          password: hashedPassword,
          email: req.body.email, 
        },
      });

      return res.status(201).json({ message: `${req.body.name} created` });
    }
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    return res.status(500).json({ message: err.message });
  }
});

export default router;
