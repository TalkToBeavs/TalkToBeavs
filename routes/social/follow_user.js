import { Router } from 'express'
const router = Router()
import User from '../../models/User/User.js'

router.post('/', async (req, res) => {
    const { email, currentUserEmail } = req.body

    if (req.user.email !== currentUserEmail) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const toFollowUser = await User.findOne({ email: email })
        const currentUser = await User.findOne({ email: currentUserEmail })

        const currentIsFollowing = currentUser.following.find(
            (user) => user.toString() === toFollowUser._id.toString()
        )

        const isFollowing = toFollowUser.followers.find(
            (user) => user.toString() === currentUser._id.toString()
        )

        const isSelf = currentUser._id.toString() === toFollowUser._id.toString()

        if (isSelf) {
            return res.status(400).json({
                message: `You can't follow yourself`,
            })
        }

        if (isFollowing && currentIsFollowing) {
            // unFollow
            currentUser.following = currentUser.following.filter(
                (user) => user.toString() !== toFollowUser._id.toString()
            )
            toFollowUser.followers = toFollowUser.followers.filter(
                (user) => user.toString() !== currentUser._id.toString()
            )

            await currentUser.save()
            await toFollowUser.save()

            return res
                .status(200)
                .json({
                    message: `${currentUser.name} unfollowed ${toFollowUser.name}`,
                    user: currentUser,
                })
        }

        if (!isFollowing && !currentIsFollowing) {
            currentUser.following.push(toFollowUser._id)
            toFollowUser.followers.push(currentUser._id)

            await currentUser.save()
            await toFollowUser.save()

            return res
                .status(200)
                .json({
                    message: `${currentUser.name} followed ${toFollowUser.name}`,
                    user: currentUser,
                })
        }

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

export default router
