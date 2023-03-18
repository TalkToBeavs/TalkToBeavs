import { Router } from 'express'
import User from '../../models/User/User.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const users = await User.find({}).select('name email online avatarImg')

        if (!users) {
            return res.status(404).json({ message: 'Users not found' })
        }

        return res.status(200).json({ users: users })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})

export default router
