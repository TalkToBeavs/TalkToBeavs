import { Router } from 'express';
// import Post from '../../models/Feed/Post.js'
// import Feed from '../../models/Feed/Feed.js'
import { FEED_ID } from '../../index.js';
import client from "../../models/prisma/prisma.js"

const router = Router();

router.post('/', async (req, res) => {
  if (req.user.email.split('@')[0] !== req.body.onid) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { postId, isUpvoted, isDownvoted, onid } = req.body;

  try {
    const postToDownvote = await client.post.findUnique({
      where: {
        id: parseInt(postId),
      },
      includes: {
        postedBy: true,
      },
    });
    // console.log("postToDownvote before:", postToDownvote)

    if (!postToDownvote) {
      return res.status(400).json({ error: 'Post to downvote not found' });
    }

    let upvotes = [...new Set(postToDownvote.upvotes)];
    let downvotes = [...new Set(postToDownvote.downvotes)];

    const alreadyDownvoted = downvotes.includes(parseInt(onid));

    if (isDownvoted === false && !alreadyDownvoted) {
      if (isUpvoted === true) {
        // postToDownvote.upvotes -= 1
        upvotes = upvotes.filter((u) => u != parseInt(onid));
        if (upvoteIndex !== -1) {
          postToDownvote.upvotes.splice(upvoteIndex, 1);
        }
        downvotes.push(parseInt(onid));
      }
    } else {
      downvotes = downvotes.filter((d) => d !== parseInt(onid));
    }

    // console.log("postToDownvote after update:", postToDownvote)

    const updatedPost = await client.post.update({
      where: { id: parseInt(postId) },
      data: {
        upvotes: upvotes,
        downvotes: downvotes,
      },
      include: { postedBy: true },
    });

    return res.status(200).json({ message: 'Post downvoted', post: updatedPost });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
