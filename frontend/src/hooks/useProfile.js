import axios from 'axios';
import { useEffect, useState } from 'react';

function useProfile({ onid }) {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `https://talk-to-beavs.herokuapp.com/api/social/get_profile?onid=${onid}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );
        setProfile(response.data.user);
      } catch (err) {
        setProfile(null);
        console.error('Unauthorized.');
      }
    };
    fetchProfile();
  }, [onid]);

  return profile;
}

export default useProfile;
