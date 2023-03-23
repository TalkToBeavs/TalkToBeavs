import axios from 'axios';
import { useEffect, useState } from 'react';

function useProfile({ onid, user }) {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `https://talk-to-beavs.herokuapp.com/api/social/get_profile?onid=${onid}`,
        );
        setProfile(response.data.user);
      } catch (err) {
        setProfile(null);
        console.error(err.response.data.message);
      }
    };
    fetchProfile();
  }, [onid, user?.following]);

  useEffect(() => {}, [profile]);

  return profile;
}

export default useProfile;
