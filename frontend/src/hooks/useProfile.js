import axios from 'axios';
import { useEffect, useState } from 'react';

const BASE_URL = import.meta.env.VITE_APP_PROD_BACKEND_URL;

if (!BASE_URL) throw new Error('Missing backend URL');

function useProfile({ onid }) {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/social/get_profile?onid=${onid}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
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
