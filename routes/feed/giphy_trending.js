import { Router } from 'express';
import axios from 'axios';
import dotenv from 'dotenv'

const router = Router();
dotenv.config();

router.get('/', async (req, res) => {
  const apiKey = process.env.GIPHY_API_KEY;

  try {
    const response = await axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25`);
    const data = response.data;

    return res.status(200).json({ message: 'GIFs retrieved', data: data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

export default router;
