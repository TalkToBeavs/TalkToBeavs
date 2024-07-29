import { Router } from 'express';
import client from '../../models/prisma/prisma.js';
import { verifyToken } from '../../middleware/token.js';

const router = Router();

router.get('/',verifyToken, async (req, res) => {
  try {
    
    const user = await client.user.findUnique({
      where:{
        email:req.user.email
      },
      select: {
        id: true,
        email: true,
        name: true,
        standing: true,
        major: true,
        bio: true,
        online: true,
        roomId: true,
        password: false
      }
     });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    } else {
      return res.status(200).json({ message: 'User loaded', user});
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
