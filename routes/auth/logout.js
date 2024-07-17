import { Router } from 'express';
// import User from '../../models/User/User.js';
import { verifyToken } from '../../middleware/token.js';
const router = Router();
import client from "../../models/prisma/prisma.js"

router.post('/', verifyToken, async (req, res) => {
  try {
    const usr = req.user;

    const email = usr.email;

    const updatedUser = await client.user.update({
      where: { email: email },
      data: { online: false },
    });
    if (!updatedUser) {
      return res.status(400).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(400).json({ message: 'User not found' });
    }
    return res.status(500).json({ message: err.message });
  }
});

export default router;
