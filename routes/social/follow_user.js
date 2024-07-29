import { Router } from 'express';


const router = Router();
import client from "../../models/prisma/prisma.js"

router.post('/', async (req, res) => {
    const { email, currentUserEmail } = req.body;

    if (req.user.email !== currentUserEmail) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const toFollowUser = await client.user.findUnique({
            where: { email: email },
            include: { followedBy: true }
        });
        const currentUser = await client.user.findUnique({
            where: { email: currentUserEmail },
            include: { following: true }
        });

        if (!toFollowUser || !currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const currentIsFollowing = currentUser.following.some(
            relation => relation.followingId === toFollowUser.id
        );

        const isFollowing = toFollowUser.followedBy.some(
            relation => relation.userId === currentUser.id
        );

        const isSelf = currentUser.id === toFollowUser.id;

        if (isSelf) {
            return res.status(400).json({
                message: `You can't follow yourself`,
            });
        }

        if (isFollowing && currentIsFollowing) {
            // Unfollow
            await client.followingRelation.deleteMany({
                where: {
                    AND: [
                        { userId: currentUser.id },
                        { followingId: toFollowUser.id }
                    ]
                }
            });

            await client.followerRelation.deleteMany({
                where: {
                    AND: [
                        { userId: toFollowUser.id },
                        { followerId: currentUser.id }
                    ]
                }
            });

            const updatedCurrentUser = await client.user.findUnique({
                where: { id: currentUser.id }
            });

            return res
                .status(200)
                .json({
                    message: `${currentUser.name} unfollowed ${toFollowUser.name}`,
                    user: updatedCurrentUser,
                });
        }

        if (!isFollowing && !currentIsFollowing) {
            await client.followingRelation.create({
                data: {
                    userId: currentUser.id,
                    followingId: toFollowUser.id
                }
            });

            await client.followerRelation.create({
                data: {
                    userId: toFollowUser.id,
                    followerId: currentUser.id
                }
            });

            const updatedCurrentUser = await client.user.findUnique({
                where: { id: currentUser.id }
            });

            return res
                .status(200)
                .json({
                    message: `${currentUser.name} followed ${toFollowUser.name}`,
                    user: updatedCurrentUser,
                });
        }

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

export default router;