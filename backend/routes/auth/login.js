import { Router } from "express";
import joi from "joi";
import User from "../../models/User.js";
const router = Router();

router.post("/", async (req, res) => {
  const schema = joi.object({
    password: joi.string().required(),
    email: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z._%+-]+@oregonstate.edu$"))
      .required(),
  });

  try {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const user = await User.find({ email: req.body.email });

    if (user.length > 0) {
      return res.status(200).json({ message: "Welcome Back!", user: user });
    } else {
      return res.status(400).json({ message: "User does not exist" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default router;
