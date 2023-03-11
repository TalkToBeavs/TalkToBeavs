import React from "react";
import { Text, Heading, Flex, Box } from "@chakra-ui/react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthProvider";

const VideoLobby = () => {
  const socket = io("http://localhost:8080");
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    let email = localStorage.getItem("email");
    console.log("email: " + email);

    socket.on("connect", () => {
      console.log("Connected to the server");
      socket.emit("joinQueue", { name: user.email });
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bg="gray.100"
    >
      <Heading textAlign={"center"}>Video Lobby</Heading>
      <Text py={4} textAlign={"center"} w={"fit-content"}>
        Waiting for other user to join...
      </Text>
    </Flex>
  );
};

export default VideoLobby;
