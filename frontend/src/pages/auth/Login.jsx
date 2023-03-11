import { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import ttb from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthProvider";

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");
  const { login } = useContext(AuthContext);

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
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form>
            <Input
              variant="filled"
              mb={3}
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              variant="filled"
              mb={3}
              autoComplete="current-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              width="full"
              mt={4}
              colorScheme="orange"
              isLoading={isLoading}
              loadingText="Logging in..."
              onClick={async (e) => {
                e.preventDefault();
                setIsLoading(true);
                setError("");
                setResponse("");
                try {
                  const response = await login(email, password);
                  setTimeout(() => {
                    if (response.status === 200) {
                      setResponse(response.data.message);
                      localStorage.setItem(
                        "email",
                        JSON.stringify(response.data.user.email)
                      );
                      setTimeout(() => {
                        navigate("/home");
                      }, 500);
                    } else {
                      setError(response.data.message);
                    }
                  }, 1000);
                } catch (error) {
                  setTimeout(() => {
                    setError(error.response.data.message);
                  }, 1000);
                }
                setTimeout(() => {
                  setIsLoading(false);
                }, 1000);
              }}
            >
              Submit
            </Button>
          </form>
        </Box>
        <Box textAlign="center">
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
        <Text mt={4} textAlign="center">
          Don't have an account?{" "}
          <Link style={{ color: "#DE6A1F" }} to="/signup">
            Sign Up
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}

export default Login;