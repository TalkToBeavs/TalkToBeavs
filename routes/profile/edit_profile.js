import { Router } from "express";
import User from "../../models/User/User.js";
import joi from "joi";

const router = Router();

router.patch("/", async (req, res) => {

      const {
            name,
            standing,
            major,
            bio,
            email,
      } = req.body;

      const schema = joi.object({
            email: joi.string().required(),
      });

      const { error } = schema.validate({ email });

      if (error) {
            return res.status(401).json({ message: error.details[0].message });
      }

      try {
            const user = await User.findOne({ email });

            if (!user) {
                  return res.status(401).json({ message: "User not found" });
            }

            user.name = name || user.name;
            user.standing = standing || user.standing;
            user.major = major || user.major;
            user.bio = bio || user.bio;

            await user.save();
            
            const { password, ...userWithoutPassword } = user.toObject();

            return res.status(200).json({ message: "Profile Updated", userWithoutPassword });

      } catch (err) {

            return res.status(500).json({ message: err.message });

      }
});

export default router;

