import { Router } from 'express';
import Feed from '../../models/Feed/Feed.js';

const router = Router();

router.post('/', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    let feed = await Feed.create({ posts: [] });
    feed = await feed.save();
    return res.status(200).json({ message: 'Feed created', feed });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
