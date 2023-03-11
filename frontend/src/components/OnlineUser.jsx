import React from "react";

import { Text, Heading, Flex, Box, AbsoluteCenter } from "@chakra-ui/react";

const OnlineUser = () => {
  const users = React.useRef([]);
  const [userArray, setUsers] = React.useState([]);

  // React.useEffect(() => {
  //   socket.on("newUserResponse", (data) => {
  //     users.current = data;
  //     setUsers(JSON.parse(JSON.stringify(data)) || []);
  //   });

  //   socket.on("removeUserResponse", (data) => {
  //     users.current = data;
  //     setUsers(data);
  //   });

  //   if (users.current.length === 0) {
  //     users.current = [];
  //     setUsers([]);
  //   }

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  return (
    <Box pos={"fixed"} right={"0"} w={"300px"} h={"100vh"} bg={"gray.200"}>
      <Heading textAlign={"center"}>Online Users</Heading>
      <Flex direction="column" overflow={"auto"} h={"300px"}>
        {userArray?.length === 0 && (
          <Text py={4} textAlign={"center"} w={"full"}>
            No users online
          </Text>
        )}
        {userArray.map((user, i) => (
          <Text key={i} py={4} textAlign={"center"} w={"full"}>
            {user?.name}
          </Text>
        ))}
      </Flex>
    </Box>
  );
};

export default OnlineUser;