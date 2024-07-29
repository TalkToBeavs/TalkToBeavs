import { Router } from 'express';
// import Feed from '../../models/Feed/Feed.js';
import client from "../../models/prisma/prisma.js"

const router = Router();

router.post('/', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const feed = await client.feed.create({
      data: {
        posts: {
          create: [],
        },
      },
      include: {
        posts: true,
      },
    });
    return res.status(200).json({ message: 'Feed created', feed });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
