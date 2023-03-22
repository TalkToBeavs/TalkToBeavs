import { Router } from 'express'
import { compare } from 'bcrypt'
import joi from 'joi'
import User from '../../models/User/User.js'
import generateAuthToken from "../../lib/generateAuthToken.js"

const router = Router()

router.post('/', async (req, res) => {
    const schema = joi.object({
        password: joi.string().required(),
        email: joi
            .string()
            .pattern(new RegExp('^[a-zA-Z._%+-]+@oregonstate.edu$'))
            .required(),
    })

    try {
        const { error } = schema.validate(req.body)

        if (error) {
            return res.status(401).json({ message: error.details[0].message })
        }

        const user = await User.findOne({ email: req.body.email })

        const validPassword = await compare(req.body.password, user.password);

        // We will need to replace to the tokens in the frontend to use this instead at some point.
        const token = generateAuthToken(user._id);

        if (user && validPassword) {
            user.online = true
            await user.save()
            const { password, ...userWithoutPassword } = user.toObject()
            return res
                .status(200)
                .json({ message: 'Welcome Back!', user: userWithoutPassword, token: token })
        } else if (user && !validPassword) {
            return res.status(401).json({ message: 'Incorrect password' })
        } else if (!user) {
            return res.status(401).json({ message: 'User not found' })
        } else {
            return res.status(401).json({ message: 'Login Failed' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

export default router
