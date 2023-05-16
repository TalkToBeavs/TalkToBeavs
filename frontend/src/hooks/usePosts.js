import axios from 'axios';
import { useEffect, useState } from 'react';

function usePosts({ onid }) {
  const [posts, setPosts] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `https://talk-to-beavs.herokuapp.com/api/feed/get_posts/user?onid=${onid}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
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
