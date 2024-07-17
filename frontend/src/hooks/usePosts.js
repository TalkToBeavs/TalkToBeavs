import axios from 'axios';
import { useEffect, useState } from 'react';

const BASE_URL = import.meta.env.VITE_APP_PROD_BACKEND_URL;

if (!BASE_URL) throw new Error('Missing backend URL');

function usePosts({ onid }) {
  const [posts, setPosts] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/feed/get_posts/user?onid=${onid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPosts(response.data.posts);
    } catch (err) {
      setPosts(null);
      console.error(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchPosts();

    return () => {
      setPosts(null);
    };
  }, [onid]);

  return posts;
}

export default usePosts;
