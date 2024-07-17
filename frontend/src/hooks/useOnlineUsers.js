import axios from 'axios';
import React from 'react';

const BASE_URL = import.meta.env.VITE_APP_PROD_BACKEND_URL;

if (!BASE_URL) throw new Error('Missing backend URL');

function useOnlineUsers() {
  const [users, setUsers] = React.useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/social/online_users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(response.data.users);
    } catch (err) {
      setUsers([]);
    }
  };

  React.useMemo(() => {
    fetchUsers();
  }, []);

  return [users, fetchUsers];
}

export default useOnlineUsers;
