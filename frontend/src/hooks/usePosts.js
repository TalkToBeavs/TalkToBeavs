import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function usePosts({ onid }) {

      const emailDomain = '@oregonstate.edu'
      onid = onid + emailDomain
      const [posts, setPosts] = useState(null)

      const fetchPosts = async () => {
            try {
              const response = await axios.get(
                `http://localhost:8080/api/feed/get_posts`
              )
              const allPosts = response.data.posts[0].posts
              const filteredPosts = allPosts.filter(post => post.postedBy === onid)
              setPosts(filteredPosts)
            } catch (err) {
              setPosts(null)
            }
          }

      useEffect(() => {
            fetchPosts()

            return () => {
                  setPosts(null)

            }

      }, [onid])

      return posts
}

export default usePosts;
