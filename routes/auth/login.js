import { Router } from 'express'
import { compare } from 'bcrypt'
import joi from 'joi'
// import User from '../../models/User/User.js'
import { generateToken } from '../../middleware/token.js'
import client from "../../models/prisma/prisma.js"

const router = Router()

router.post('/', async (req, res) => {
    const schema = joi.object({
        password: joi.string().required(),
        email: joi
            .string()
            .pattern(new RegExp('^[a-zA-Z0-9._%+-]+@oregonstate.edu$'))
            .required(),
    })

    try {
        const { error } = schema.validate(req.body)

        if (error) {
            return res.status(401).json({ message: error.details[0].message })
        }

        const user = await client.User.findUnique({
            where:{
                email:req.body.email
            }
         })
         if (!user) {
            return res.status(401).json({ message: 'User not found' })
        }
        const validPassword = await compare(req.body.password, user.password)
        if (!validPassword) {
            return res.status(401).json({ message: 'Incorrect password' })
        }

        const token = generateToken(user);

        


        const updatedUser = await client.user.update({
            where: { id: user.id },
            data: { online: true },
            select: {
                id: true,
                email: true,
                name: true,
                standing: true,
                major: true,
                bio: true,
                online: true,
                roomId: true,
                password: false
            }
        })

        return res
            .status(200)
            .json({ message: 'Welcome Back!', user: updatedUser, token: token })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

})

export default router
