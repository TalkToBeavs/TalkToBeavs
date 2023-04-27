import { Router } from 'express'
import joi from 'joi'
import Post from '../../models/Feed/Post.js'
import Feed from '../../models/Feed/Feed.js'
import User from '../../models/User/User.js'
import dotenv from 'dotenv'

const router = Router()

dotenv.config()

router.post('/', async (req, res) => {
    const schema = joi.object({
        content: joi.string().required(),
        postedBy: joi.string().required(),
    })

    const onid = req.user.email.split('@')[0]
    if (onid !== req.body.postedBy) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    const { error } = schema.validate(req.body)

    const { content, postedBy } = req.body

    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }

    try {
        const user = await User.findOne({ email: postedBy })

        if (!user) {
            return res.status(400).json({ error: 'User not found' })
        }

        const post = new Post({
            content,
            postedBy: user.email,
        })

        await post.save()

        user.posts.push(post)

        await user.save()

        const feed = await Feed.findOne({ _id: process.env.FEED_ID })

        feed.posts.push(post)

        await feed.save()

        return res.status(200).json({ message: 'Post created', post })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})

export default router
