import { Router } from 'express'
import Post from '../../models/Feed/Post.js'
import Feed from '../../models/Feed/Feed.js'
import dotenv from 'dotenv'

const router = Router()

dotenv.config()

router.post('/', async (req, res) => {
    const { postId, isUpvoted, isDownvoted, onid } = req.body

    try {
        const postToUpvote = await Post.findById(postId)

        // console.log("postToUpvote before the update:", postToUpvote)

        if (!postToUpvote) {
            return res.status(400).json({ error: 'Post to upvote not found' })
        }

        if (isUpvoted === false) {
            if (isDownvoted === true){
                // postToUpvote.downvotes -= 1
                const downvotesIndex = postToUpvote.downvotes.indexOf(onid);
                if (downvotesIndex !== -1) {
                    postToUpvote.downvotes.splice(downvotesIndex, 1);
                }
            }
            // postToUpvote.upvotes += 1
            postToUpvote.upvotes.push(onid)
        } else {
            // postToUpvote.upvotes -= 1
            const upvoteIndex = postToUpvote.upvotes.indexOf(onid);
            if (upvoteIndex !== -1) {
                postToUpvote.upvotes.splice(upvoteIndex, 1);
            }
        }

        const feed = await Feed.findOne({ _id: process.env.FEED_ID })
        const postIndex = feed.posts.findIndex(post => post._id.toString() === postId.toString());
        feed.posts[postIndex] = postToUpvote

        // console.log("postToUpvote after the update:", postToUpvote)

        await feed.save();
        await postToUpvote.save();

        return res.status(200).json({ message: 'Post upvoted', post: postToUpvote })
    } catch (err) {
        console.log(err.message )
        return res.status(500).json({ error: err.message })
    }
})

export default router