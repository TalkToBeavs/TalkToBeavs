import React from "react";
import {
	Box,
	Stack,
	Flex,
	Image,
	HStack,
	Link,
	Icon,
	Divider,
	VStack,
	Text,
	chakra,
} from "@chakra-ui/react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { GrInstagram } from "react-icons/gr";
import TalkToBeavs, { TalkToBeavsMobile } from "../text/TalkToBeavs";
import { AiOutlineGithub } from "react-icons/ai";

export default function Footer() {
	return (
		<>
			<Flex
				w="full"
				bg="#edf3f8"
				_dark={{
					bg: "#3e3e3e",
				}}
				alignItems={{ base: "center", md: "center" }}
			>
				<Flex
					w="full"
					as="footer"
					flexDir={{
						base: "column",
						md: "row",
					}}
					gap={8}
					align="center"
					justify="space-between"
					bg="white"
					_dark={{
						bg: "gray.800",
					}}
					py={4}
					px={4}
				>
					<TalkToBeavsMobile />
					<Flex
						align={{
							base: "center",
							md: "center",
						}}
						justify={{
							base: "center",
							md: "center",
							lg: "space-between",
						}}
						gap={16}
						mx={4}
					>
						Made with ❤️ by the TalkToBeavs team.
						<chakra.a
							href="https://github.com/nyumat/talktobeavs"
							mx="2"
							color="gray.600"
							_dark={{
								color: "gray.300",
								_hover: {
									color: "gray.400",
								},
							}}
							_hover={{
								color: "gray.500",
							}}
							aria-label="GitHub"
						>
							<Icon as={AiOutlineGithub} boxSize={8} />
						</chakra.a>
						{/* <chakra.a
							href="#"
							mx="2"
							color="gray.600"
							_dark={{
								color: "gray.300",
								_hover: {
									color: "gray.400",
								},
							}}
							_hover={{
								color: "gray.500",
							}}
							aria-label="Facebook"
						>
							Privacy Policy
						</chakra.a>

						<chakra.a
							href="#"
							mx="2"
							color="gray.600"
							_dark={{
								color: "gray.300",
								_hover: {
									color: "gray.400",
								},
							}}
							_hover={{
								color: "gray.500",
							}}
							aria-label="Github"
						>
							Code of Conduct
						</chakra.a> */}
						<chakra.a
							onClick={() => {
								window.scrollTo(0, 0, { behavior: "smooth" });
							}}
							mx="2"
							textAlign="center"
							color="gray.600"
							_dark={{
								color: "gray.300",
								_hover: {
									color: "gray.400",
								},
							}}
							aria-label="Scroll to top"
							_hover={{
								color: "gray.500",
								textDecoration: "underline",
								cursor: "pointer",
							}}
						>
							Go Back To The Top
						</chakra.a>
					</Flex>

					<chakra.p
						py={{
							base: "2",
							sm: "0",
						}}
						textAlign="center"
						color="gray.800"
						_dark={{
							color: "white",
						}}
					>
						All rights reserved
					</chakra.p>
				</Flex>
			</Flex>
		</>
	);
}
