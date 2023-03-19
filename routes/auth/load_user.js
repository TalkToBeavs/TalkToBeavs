import { Router } from 'express'
import User from '../../models/User/User.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const userEmail = req.query.email

        const user = await User.findOne({ email: userEmail })

        if (!user) {
            return res.status(400).json({ error: 'User not found' })
        }

        return res.status(200).json({ message: 'User loaded', user: user })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})

export default router
