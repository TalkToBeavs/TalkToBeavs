import { Router } from 'express';
// import Post from '../../models/Feed/Post.js';
// import Feed from '../../models/Feed/Feed.js';
import { FEED_ID } from '../../index.js';
import client from "../../models/prisma/prisma.js"

const router = Router();

router.post('/', async (req, res) => {
  if (req.user.email.split('@')[0] !== req.body.onid) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { postId, isUpvoted, isDownvoted, onid } = req.body;

  try {
    const postToUpvote = await client.post.findUnique({
      where: { id: parseInt(postId) },
    });

    // console.log("postToUpvote before the update:", postToUpvote)

    if (!postToUpvote) {
      return res.status(400).json({ error: 'Post to upvote not found' });
    }

    let upvotes = [...new Set(postToUpvote.upvotes)];
   let downvotes = [...new Set(postToUpvote.downvotes)];

    const alreadyUpvoted = upvotes.includes(parseInt(onid));

    if (isUpvoted === false && !alreadyUpvoted) {
      if (isDownvoted === true) {
        // postToUpvote.downvotes -= 1
        downvotes = downvotes.filter(id => id !== parseInt(onid));
      }
      upvotes.push(parseInt(onid));
    }else{
      upvotes = upvotes.filter(id => id !== parseInt(onid));
    }
       
    const updatedPost = await client.post.update({
      where: { id: parseInt(postId) },
      data: {
        upvotes: upvotes,
        downvotes: downvotes,
      },
      include: { postedBy: true }
    });

    return res.status(200).json({ message: 'Post upvoted', post: postToUpvote });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
});

export default router;