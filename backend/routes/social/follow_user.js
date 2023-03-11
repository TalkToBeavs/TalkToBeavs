import { Router } from "express";
const router = Router();
import User from "../../models/User/User.js";

router.post("/", async (req, res) => {
  const { email, currentUserEmail } = req.body;
  try {
    const toFollowUser = await User.findOne({ email: email });
    const currentUser = await User.findOne({ email: currentUserEmail });

        console.log(toFollowUser);
            console.log(currentUser);
    currentUser.followers.push(toFollowUser);
        toFollowUser.following.push(currentUser);
        
        console.log(toFollowUser);
        console.log(currentUser);

    await currentUser.save();
    await toFollowUser.save();

    return res
      .status(200)
      .json({ message: `${currentUser.name} followed ${toFollowUser.name}` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default router;
