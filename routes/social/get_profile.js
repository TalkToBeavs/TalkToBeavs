import { Router } from 'express';
// import User from '../../models/User/User.js';
import client from "../../models/prisma/prisma.js"
const router = Router();

router.get('/', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { onid } = req.query;
    const email = `${onid}@oregonstate.edu`;

    const userProfile = await client.User.findUnique({
      where: {
        email: email
      }
    });

    
    if (!userProfile) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { password, ...userWithoutPassword } = userProfile();

    return res.status(200).json({ user: userWithoutPassword });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
