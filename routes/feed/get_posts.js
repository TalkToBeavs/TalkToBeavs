import { Router } from 'express';
import Feed from '../../models/Feed/Feed.js';
import Post from '../../models/Feed/Post.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const feed = await Feed.find({}).populate('posts').exec();

    feed[0]?.posts.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
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
    const posts = await Post.find({ postedBy: onid }).exec();

    if (!posts) {
      return res.status(404).json({ message: 'No posts found' });
    }

    posts.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return res.status(200).json({ posts });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
