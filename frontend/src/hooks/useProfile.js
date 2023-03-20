import axios from 'axios';
import { useEffect, useState } from 'react';

function useProfile({ onid, user }) {
  const [profile, setProfile] = useState(null);
  const fetchProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/social/get_profile?onid=${onid}`);
      setProfile(response.data.user);
    } catch (err) {
      setProfile(null);
      console.error(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchProfile();

    return () => {
      setProfile(null);
    };
  }, [onid, user?.following]);

  return profile;
}

export default useProfile;
