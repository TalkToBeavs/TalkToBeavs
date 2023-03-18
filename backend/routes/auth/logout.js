import { Router } from 'express'
import User from '../../models/User/User.js'
const router = Router()

router.post('/', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email })
      if (!user) {
        return res.status(401).json({ message: 'User not found' })
      }
  
      user.online = false
      await user.save()
  
      return res.status(200).json({ message: 'Logged out successfully' })
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  })
  
  export default router