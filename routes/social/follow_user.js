import { Router } from 'express'
const router = Router()
import User from '../../models/User/User.js'

router.post('/', async (req, res) => {
    const { email, currentUserEmail } = req.body
    try {
        const toFollowUser = await User.findOne({ email: email })
        const currentUser = await User.findOne({ email: currentUserEmail })

        // Check if user is already following
        // The following and followers arrays are populated with a list of _id's
        // of the users that are following or being followed

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


        // // Check if user is already following
        // const currentIsFollowing = currentUser.following.find(
        //     (user) => user._id === toFollowUser.email
        // )

        // const isFollowing = toFollowUser.followers.find(
        //     (user) => user.email === currentUser.email
        // )

        // const isSelf = currentUser.email === toFollowUser.email

        // if (isSelf) {
        //     return res.status(400).json({
        //         message: `You can't follow yourself`,
        //     })
        // }



        // if (isFollowing && currentIsFollowing) {
        //     return res.status(400).json({
        //         message: `${currentUser.name} is already following ${toFollowUser.name}`,
        //     })
        // }


        // if (!isFollowing && !currentIsFollowing) {

        //     currentUser.following.push(toFollowUser)
        //     toFollowUser.followers.push(currentUser)

        //     await currentUser.save()
        //     await toFollowUser.save()


        //     return res
        //         .status(200)
        //         .json({
        //             message: `${currentUser.name} followed ${toFollowUser.name}`,
        //             targetUser: toFollowUser,
        //             currentUser: currentUser,
        //             isFollowing: isFollowing,
        //             currentIsFollowing: currentIsFollowing,
        //         })

        // }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

export default router
