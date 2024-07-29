import { Router } from 'express';
// import Post from '../../models/Feed/Post.js';
// import Feed from '../../models/Feed/Feed.js';
import { FEED_ID } from '../../index.js';
import client from "../../models/prisma/prisma.js"

const router = Router();

router.post('/', async (req, res) => {
  const { postId, content } = req.body;

  try {
    const postToEdit = await client.post.findUnique({
      where: {
        id: parseInt(postId),
      },
      include: {
        postedBy: true,
      },
    });

    if (!postToEdit) {
      return res.status(400).json({ error: 'Post to edit not found' });
    }

    if (postToEdit.postedBy.email.split('@')[0] !== req.user.email.split('@')[0]) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const updatedPost = await client.post.update({
      where: { id: parseInt(postId) },
      data: {
        content: content,
        updatedAt: new Date(),
      },
      include: { postedBy: true },
    });

    return res.status(200).json({ message: 'Post edited', post: updatedPost });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
