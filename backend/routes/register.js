import { Router } from "express";
import joi from "joi";
import User from "../models/User.js";
const router = Router();

router.post("/", async (req, res) => {
  const schema = joi.object({
    name: joi.string().required(),
    password: joi.string().required(),
    email: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z._%+-]+@oregonstate.edu$"))
      .required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
  }

  const user = await User.find({ email: req.body.email });
  if (user.length > 0) {
    res.status(400).json({ message: "User already exists" });
    return;
  } else {
    const user = new User({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    });

    await user
      .save()
      .then(() => {
        res
          .status(200)
          .json({ message: "User created successfully", user: user });
      })
      .catch((err) => {
        res.status(400).json({ message: "User creation failed", error: err });
      });
  }
});

export default router;
