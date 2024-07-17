import { Router } from 'express';
// import Feed from '../../models/Feed/Feed.js';
// import Post from '../../models/Feed/Post.js';
import client from "../../models/prisma/prisma.js"

const router = Router();

router.get('/', async (req, res) => {
  try {
    const feed = await client.Feed.findMany({
      includes: {
        posts: {
          include: { postedBy: true },
          orderBy: { postAt: 'desc' },
        },
      },
    });

    return res.status(200).json({ posts: feed });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get('/user', async (req, res) => {
  const user = req.user;
  const onid = user.email.split('@')[0];

  try {
    const posts = await client.post.findMany({
      where: {
        postedBy: {
          email: {
            startsWith: onid + '@',
          },
        },
      },
      include: { postedBy: true },
      orderBy: { postAt: 'desc' },
    });

    if (posts.length === 0) {
      return res.status(404).json({ message: 'No posts found' });
    }
    return res.status(200).json({ posts });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
