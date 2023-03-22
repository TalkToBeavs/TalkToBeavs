import { Router } from 'express'
import Post from '../../models/Feed/Post.js'
import Feed from '../../models/Feed/Feed.js'
import dotenv from 'dotenv'

const router = Router()

dotenv.config()

router.post('/', async (req, res) => {
    const { postId } = req.body
    try {
        await Post.findOneAndRemove({ _id: postId })

        const feed = await Feed.findOne({ _id: process.env.FEED_ID })
        const postIndex = feed.posts.findIndex(post => post._id.toString() === postId.toString());
        if (postIndex !== -1) {                 
          feed.posts.splice(postIndex, 1);      
        }
        
        feed.posts.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        await feed.save();
        
        return res.status(200).json({ message: 'Posts deleted', posts: feed.posts })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})

export default router
