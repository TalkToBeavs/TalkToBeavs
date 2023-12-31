import { useMediaQuery } from "@chakra-ui/media-query";
import { motion } from "framer-motion";
import {
	Box,
	Button,
	Center,
	Heading,
	Stack,
	Text,
	useBreakpointValue,
	useColorMode,
	chakra,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { BreakpointDebug } from "@/components/debug/index";
import Navbar from "@/components/nav/index";

const reImaginedVariant = {
	hidden: {
		opacity: 0,
		y: 50,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: "easeInOut",
			delay: 0.8,
		},
		scale: 1,
	},
};

const videoChatVariant = {
	hidden: {
		opacity: 0,
		y: 120,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: "easeInOut",
			delay: 0,
		},
		scale: 1,
	},
};

const descriptionVariant = {
	hidden: {
		opacity: 0,
		y: 50,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: "easeInOut",
			delay: 1.2,
		},
		scale: 1,
	},
};

const buttonVariant = {
	hidden: {
		opacity: 0,
		y: 50,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: "easeInOut",
			delay: 1.5,
		},
		scale: 1,
	},
};

export default function Hero() {
	const navigate = useNavigate();
	const { colorMode } = useColorMode();
	const [isMobile] = useMediaQuery("(max-width: 768px)");
	return (
		<>
			{!isMobile && <Navbar />}
			<Box
				py={8}
				textAlign="center"
				h={"100dvh"}
				maxW={"3xl"}
				mx={"auto"}
				my={{ base: 0, sm: 16, md: 0, lg: 0, xl: 0 }}
			>
				<Stack
					align={"center"}
					justify={"center"}
					spacing={{ base: 4, sm: 8, md: 4, lg: 4, xl: 4 }}
				>
					<motion.div
						variants={videoChatVariant}
						initial="hidden"
						animate="visible"
					>
						<Heading
							as="h1"
							pb={2}
							size={{
								base: "3xl",
								sm: "4xl",
								md: "5xl",
								lg: "6xl",
							}}
							fontSize={{
								base: "4xl",
								sm: "5xl",
								md: "6xl",
								lg: "7xl",
								xl: "8xl",
							}}
							letterSpacing={"tight"}
							bgGradient={"linear(to-tl, brand.600, brand.400)"}
							bgClip="text"
							textAlign="center"
						>
							Chatting,
						</Heading>
					</motion.div>
					<motion.div
						variants={reImaginedVariant}
						initial="hidden"
						animate="visible"
					>
						<Heading
							as="h1"
							size={{
								base: "3xl",
								sm: "4xl",
								md: "5xl",
								lg: "6xl",
							}}
							fontSize={{
								base: "4xl",
								sm: "5xl",
								md: "6xl",
								lg: "7xl",
								xl: "8xl",
							}}
							letterSpacing={"tight"}
							transform={{
								base: "translateY(-0.1em)",
								sm: "translateY(-0.1em)",
								md: "translateY(-0.5em)",
								lg: "translateY(-0.6em)",
								xl: "translateY(-0.7em)",
							}}
							textAlign="center"
						>
							Reimagined.
						</Heading>
					</motion.div>

					<motion.div
						variants={descriptionVariant}
						initial="hidden"
						animate="visible"
					>
						<Text
							mb={8}
							fontSize={{
								base: "md",
								sm: "lg",
								md: "lg",
								lg: "2xl",
								xl: "2xl",
							}}
							transform={{ xl: "translateY(-1.5em)" }}
							color={
								colorMode === "light" ? "gray.600" : "gray.400"
							}
							textAlign="center"
							maxW={{
								base: "xs",
								sm: "sm",
								md: "md",
								lg: "lg",
								xl: "xl",
							}}
						>
							TalkToBeavs opens the door to real-time video and
							text connections between{" "}
							<chakra.span
								letterSpacing={"tight"}
								bgGradient={
									"linear(to-tl, brand.600, brand.400)"
								}
								bgClip="text"
								fontWeight={"semibold"}
							>
								OSU students
							</chakra.span>
							, making every conversation on our platform an
							unforgettable experience.
						</Text>
					</motion.div>

					<motion.div
						variants={buttonVariant}
						initial="hidden"
						animate="visible"
					>
						<Center>
							<Button
								colorScheme="brand"
								aria-label="Join The Conversation"
								variant={"solid"}
								leftIcon={<AiOutlineLogin />}
								onClick={() => {
									navigate("/signup");
								}}
								size="lg"
								bgGradient={
									"linear(to-tl, brand.600, brand.400)"
								}
								_hover={{
									transform: "scale(1.05)",
									bgGradient:
										"linear(to-tl, brand.700, brand.500)",
								}}
							>
								Join The Conversation
							</Button>
						</Center>
					</motion.div>
				</Stack>
			</Box>
		</>
	);
}
