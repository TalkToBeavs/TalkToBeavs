import React from 'react';
import axios from 'axios';

function useOnlineUsers() {
  const [users, setUsers] = React.useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/social/online_users');
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
