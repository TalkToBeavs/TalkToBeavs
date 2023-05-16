import { Router } from 'express';
import User from '../../models/User/User.js';
import { verifyToken } from '../../middleware/token.js';
const router = Router();

router.post('/', verifyToken, async (req, res) => {
  try {

    const usr = req.user;

    const email = usr.email;

  
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    user.online = false;
    await user.save();

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default router;
