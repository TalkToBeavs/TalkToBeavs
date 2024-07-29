import { Router } from 'express'
import joi from 'joi'
// import Post from '../../models/Feed/Post.js'
// import Feed from '../../models/Feed/Feed.js'
// import User from '../../models/User/User.js'
import { FEED_ID } from '../../index.js'
import client from "../../models/prisma/prisma.js"


const router = Router()

router.post('/', async (req, res) => {
    const schema = joi.object({
        content: joi.string().required(),
        postedBy: joi.string().required(),
    })

    const onid = req.user.email.split('@')[0]
    if (onid !== req.body.postedBy.split('@')[0]) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    const { error } = schema.validate(req.body)

    const { content, postedBy } = req.body

    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }

    try {
        const user = await client.user.findUnique({ 
            where:{
                email: postedBy
     }
     })

        if (!user) {
            return res.status(400).json({ error: 'User not found' })
        }

        const post = await client.post.create({
            data:{
                postedBy: { connect: { email: user.email } },
                Feed: { connect: { id: FEED_ID } }
        },
        include: {
            postedBy: true,
            Feed: true
        }
        })
        return res.status(200).json({ message: 'Post created', post })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})

export default router
