import { Router } from 'express'
import joi from 'joi'
import User from '../../models/User/User.js'
import { genSalt, hash } from "bcrypt"
const router = Router()

router.post('/', async (req, res) => {
    const schema = joi.object({
        name: joi.string().required(),
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

        if (user) {
            return res.status(400).json({ message: 'User already exists' })
        } else {
            const user = new User({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
            })

            const salt = await genSalt(10);
            user.password = await hash(user.password, salt);

            await user.save()

            return res.status(201).json({ message: `${req.body.name} created` })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

export default router
