import { Router } from "express";
// import User from "../../models/User/User.js";
import joi from "joi";
import client from "../../models/prisma/prisma.js"

const router = Router();

router.patch("/", async (req, res) => {

      const {
            name,
            standing,
            major,
            bio,
            email,
      } = req.body;

      if (req.user.email !== email) {
            return res.status(401).json({ message: "Unauthorized" });
      }

      const schema = joi.object({
            email: joi.string().required(),
      });

      const { error } = schema.validate({ email });

      if (error) {
            return res.status(401).json({ message: error.details[0].message });
      }

      try {
            const user = await client.User.findUnique({
                  where: {
                        email: email
                  }
            });

            if (!user) {
                  return res.status(401).json({ message: "User not found" });
            }
            const updatedUser = await client.User.update({
                  where: { email: email },
                  data: {

                        name: name || user.name,
                        standing: standing || user.standing,
                        major: major || user.major,
                        bio: bio || user.bio
                  }
            })



            const { password, ...userWithoutPassword } = updatedUser;

            return res.status(200).json({ message: "Profile Updated", userWithoutPassword });

      } catch (err) {

            return res.status(500).json({ message: err.message });

      }
});

export default router;

