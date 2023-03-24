import { Router } from 'express'
import Post from '../../models/Feed/Post.js'
import Feed from '../../models/Feed/Feed.js'
import dotenv from 'dotenv'

const router = Router()

dotenv.config()

router.post('/', async (req, res) => {
    const { postId, content } = req.body
    try {
        const postToEdit = await Post.findById(postId)

        if (!postToEdit) {
            return res.status(400).json({ error: 'Post to edit not found' })
        }

        postToEdit.content = content

        const feed = await Feed.findOne({ _id: process.env.FEED_ID })
        const postIndex = feed.posts.findIndex(post => post._id.toString() === postId.toString());
        feed.posts[postIndex] = postToEdit
        
        await feed.save();
        await postToEdit.save();
        
        return res.status(200).json({ message: 'Post edited', post: postToEdit })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})

export default router
