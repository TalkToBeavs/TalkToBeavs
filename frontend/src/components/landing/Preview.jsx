import React from "react";
import { Flex, useColorMode, Container } from "@chakra-ui/react";
import Mockup from "./Mockup";

export default function Preview() {
	const { colorMode } = useColorMode();
	return (
		<>
			<Container
				maxW={"7xl"}
				mx={"auto"}
				pb={24}
				pt={-24}
				textAlign="center"
			>
				<Flex
					shadow="3xl"
					maxW={{ base: "4xl", md: "5xl" }}
					mx="auto"
					borderColor={
						colorMode === "light" ? "gray.200" : "gray.700"
					}
					justify="center"
					color={colorMode === "light" ? "gray.700" : "gray.200"}
					boxShadow={
						colorMode === "light"
							? "0px 0px 20px 20px rgba(0, 0, 0, 0.05)"
							: "0px 0px 20px 20px rgba(255, 255, 255, 0.05)"
					}
					borderRadius="lg"
				>
					<Mockup />
				</Flex>
			</Container>
		</>
	);
}
