import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function usePosts({ onid }) {
  const [posts, setPosts] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/feed/get_posts`);
      setPosts(response.data.posts[0].posts);
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
