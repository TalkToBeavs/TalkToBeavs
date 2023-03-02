import { useState } from "react";
import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import axios from "axios";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bg="gray.100"
    >
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Box textAlign="center">
          <Heading>Sign Up</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form>
            <Input
              variant="filled"
              mb={3}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              variant="filled"
              mb={3}
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              variant="filled"
              mb={3}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              width="full"
              mt={4}
              colorScheme="teal"
              isLoading={isLoading}
              loadingText="Submitting"
              onClick={async (e) => {
                e.preventDefault();
                setIsLoading(true);
                try {
                  const response = await axios.post(
                    "http://localhost:8080/api/register",
                    {
                      email,
                      name,
                      password,
                    }
                  );
                  setResponse(response.data.message);
                } catch (error) {
                  setError(error.response.data.message);
                }
                setIsLoading(false);
              }}
            >
              Submit
            </Button>
          </form>
        </Box>
        {error && (
          <Text mt={4} textAlign="center" color="red.500">
            {error}
          </Text>
        )}
        {response && (
          <Text mt={4} textAlign="center" color="green.500">
            {response}
          </Text>
        )}
      </Box>
    </Flex>
  );
}

export default App;
