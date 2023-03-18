import { Router } from 'express'
import User from '../../models/User/User.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const onid = req.query.onid
        const email = req.query.onid + '@oregonstate.edu'

        const userProfile = await User.findOne({ email: email })

        if (!userProfile) {
            return res.status(404).json({ message: 'User not found' })
        }

        return res.status(200).json({ user: userProfile })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})

export default router
