import { Router } from 'express';
// import Post from '../../models/Feed/Post.js'
// import Feed from '../../models/Feed/Feed.js'
import { FEED_ID } from '../../index.js';
import client from "../../models/prisma/prisma.js"
const router = Router();

router.post('/', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { postId } = req.body;
  try {
    const post = await client.Post.findUnique({
      where: {
        id: postId,
      },
      includes: {
        postedBy: true,
      },
    });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.postedBy.email.split('@')[0] !== req.user.email.split('@')[0]) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    await client.Post.delete({
      where: { id: postedId },
    });
    const updatedFeed = await client.Feed.findUnique({
      where: { id: FEED_ID },
      include: {
        posts: {
          orderBy: { createdAt: 'desc' },
          include: { postedBy: true },
        },
      },
    });
    if (!updatedFeed) {
      return res.status(404).json({ message: 'Feed not found' });
    }

    return res.status(200).json({ message: 'Post deleted', posts: updatedFeed.posts });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
