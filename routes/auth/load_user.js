import { Router } from 'express'
import User from '../../models/User/User.js'
import { compare } from 'bcrypt'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const userEmail = req.query.email
        const token = req.query.token

        const user = await User.findOne({ email: userEmail })
        let password = compare(token, user.password)

        if (!password) {
            return res.status(400).json({ error: 'Invalid token' })
        }

        if (!user || !password) {
            return res.status(400).json({ error: 'User not found' })
        } else {
            // We do not want to send the password back to the client.
            const { password, ...userWithoutPassword } = user.toObject()
            return res.status(200).json({ message: 'User loaded', user: userWithoutPassword })
        }

    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})

export default router
