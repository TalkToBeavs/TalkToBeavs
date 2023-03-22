import axios from 'axios';
import React from 'react';

function useOnlineUsers() {
  const [users, setUsers] = React.useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://talk-to-beavs.herokuapp.com/api/social/online_users');
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
