import React, { useRef } from "react";
import { Box, Flex, chakra, Icon, Stack } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";

// Separate variables for icons
const osuIcon = (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
	</svg>
);

const messagingIcon = (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
	</svg>
);

const secureIcon = (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
	</svg>
);

const customizableIcon = (
	<svg viewBox="0 0 20 20">
		<path
			fill="none"
			d="M10,10.9c2.373,0,4.303-1.932,4.303-4.306c0-2.372-1.93-4.302-4.303-4.302S5.696,4.223,5.696,6.594C5.696,8.969,7.627,10.9,10,10.9z M10,3.331c1.801,0,3.266,1.463,3.266,3.263c0,1.802-1.465,3.267-3.266,3.267c-1.8,0-3.265-1.465-3.265-3.267C6.735,4.794,8.2,3.331,10,3.331z"
		></path>
		<path
			fill="none"
			d="M10,12.503c-4.418,0-7.878,2.058-7.878,4.685c0,0.288,0.231,0.52,0.52,0.52c0.287,0,0.519-0.231,0.519-0.52c0-1.976,3.132-3.646,6.84-3.646c3.707,0,6.838,1.671,6.838,3.646c0,0.288,0.234,0.52,0.521,0.52s0.52-0.231,0.52-0.52C17.879,14.561,14.418,12.503,10,12.503z"
		></path>
	</svg>
);

const followersIcon = (
	<svg viewBox="0 0 20 20">
		<path d="M15.684,16.959L10.879,8.52c0.886-0.343,1.517-1.193,1.517-2.186c0-1.296-1.076-2.323-2.396-2.323S7.604,5.037,7.604,6.333c0,0.993,0.63,1.843,1.517,2.186l-4.818,8.439c-0.189,0.311,0.038,0.708,0.412,0.708h10.558C15.645,17.667,15.871,17.27,15.684,16.959 M8.562,6.333c0-0.778,0.645-1.382,1.438-1.382s1.438,0.604,1.438,1.382c0,0.779-0.645,1.412-1.438,1.412S8.562,7.113,8.562,6.333 M5.55,16.726L10,8.91l4.435,7.815H5.55z M15.285,9.62c1.26-2.046,1.26-4.525,0-6.572c-0.138-0.223-0.064-0.512,0.162-0.646c0.227-0.134,0.521-0.063,0.658,0.16c1.443,2.346,1.443,5.2,0,7.546c-0.236,0.382-0.641,0.17-0.658,0.159C15.221,10.131,15.147,9.842,15.285,9.62 M13.395,8.008c0.475-1.063,0.475-2.286,0-3.349c-0.106-0.238,0.004-0.515,0.246-0.62c0.242-0.104,0.525,0.004,0.632,0.242c0.583,1.305,0.583,2.801,0,4.106c-0.214,0.479-0.747,0.192-0.632,0.242C13.398,8.523,13.288,8.247,13.395,8.008 M3.895,10.107c-1.444-2.346-1.444-5.2,0-7.546c0.137-0.223,0.431-0.294,0.658-0.16c0.226,0.135,0.299,0.424,0.162,0.646c-1.26,2.047-1.26,4.525,0,6.572c0.137,0.223,0.064,0.512-0.162,0.646C4.535,10.277,4.131,10.489,3.895,10.107 M5.728,8.387c-0.583-1.305-0.583-2.801,0-4.106c0.106-0.238,0.39-0.346,0.631-0.242c0.242,0.105,0.353,0.382,0.247,0.62c-0.475,1.063-0.475,2.286,0,3.349c0.106,0.238-0.004,0.515-0.247,0.62c-0.062,0.027-0.128,0.04-0.192,0.04C5.982,8.668,5.807,8.563,5.728,8.387"></path>
	</svg>
);

const videoChatIcon = (
	<svg class="svg-icon" viewBox="0 0 20 20">
		<path d="M17.919,4.633l-3.833,2.48V6.371c0-1-0.815-1.815-1.816-1.815H3.191c-1.001,0-1.816,0.814-1.816,1.815v7.261c0,1.001,0.815,1.815,1.816,1.815h9.079c1.001,0,1.816-0.814,1.816-1.815v-0.739l3.833,2.478c0.428,0.226,0.706-0.157,0.706-0.377V5.01C18.625,4.787,18.374,4.378,17.919,4.633 M13.178,13.632c0,0.501-0.406,0.907-0.908,0.907H3.191c-0.501,0-0.908-0.406-0.908-0.907V6.371c0-0.501,0.407-0.907,0.908-0.907h9.079c0.502,0,0.908,0.406,0.908,0.907V13.632zM17.717,14.158l-3.631-2.348V8.193l3.631-2.348V14.158z"></path>
	</svg>
);

const offeringsData = [
	{
		title: "OSU Exclusive Posting Feed",
		icon: osuIcon,
		description:
			"Ever wanted to share your thoughts with the entire OSU community? Now you can! You can post to our shared feed and other students can see it.",
	},
	{
		title: "Real-Time, Private Messaging",
		icon: messagingIcon,
		description:
			"No more waiting 2 days for a response. You can message other students in real-time, and they can message you back in real-time. It's really that easy.",
	},
	{
		title: "Secure, Private, and Anonymous",
		icon: secureIcon,
		description:
			"All sensitive data is encrypted and stored securely. We also don't require you to provide any personal information, so you can stay borderline anonymous.",
	},
	{
		title: "Customizable Profiles",
		icon: customizableIcon,
		description:
			"You can customize your profile with a profile picture, a bio, and your major. You're also able to see other students' profiles.",
	},
	{
		title: "Followers, Following, and Friends",
		icon: followersIcon,
		description:
			"You can follow other students, and other students can follow you. You can also add other students as friends, and they can do the same to you.",
	},
	{
		title: "Video Chat, Right in Your Browser",
		icon: videoChatIcon,
		description:
			"You can video chat with other students right in your browser. No need to download any software. Just click a button and you're good to go.",
	},
];

const Offering = (props) => {
	return (
		<Flex>
			<Flex shrink={0}>
				<Flex
					alignItems="center"
					justifyContent="center"
					h={12}
					w={12}
					rounded="md"
					color="white"
					bgGradient={"linear(to-tl, brand.600, brand.400)"}
					_hover={{
						bgGradient: "linear(to-tl, brand.700, brand.500)",
					}}
				>
					<Icon
						boxSize={6}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						{props.icon}
					</Icon>
				</Flex>
			</Flex>
			<Box ml={4}>
				<chakra.dt
					fontSize="lg"
					lineHeight="6"
					letterSpacing={"tight"}
					// bgGradient={"linear(to-tl, brand.700, brand.500)"}
					// bgClip="text"
					fontWeight="semibold"
				>
					{props.title}
				</chakra.dt>
				<chakra.dd
					mt={2}
					color="gray.500"
					_dark={{
						color: "gray.400",
					}}
				>
					{props.children}
				</chakra.dd>
			</Box>
		</Flex>
	);
};

const Offerings = () => {
	const ref = useRef();
	const ref2 = useRef();
	const inView = useInView(ref, { once: true });
	const inView2 = useInView(ref2, { once: true });
	const staggerContainer = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.3,
				delayChildren: 0.8,
			},
		},
	};

	const parent = {
		hidden: {
			opacity: 0,
			y: 50,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.8,
				ease: "easeInOut",
				delay: 1.2,
			},
		},
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0, transition: { type: "spring", damping: 12 } },
	};
	return (
		<Flex
			bg="#edf3f8"
			_dark={{
				bg: "gray.700",
			}}
			p={20}
			w="auto"
			justifyContent="center"
			alignItems="center"
			ref={ref2}
		>
			<Box
				py={12}
				bg="white"
				_dark={{
					bg: "gray.800",
				}}
				rounded="xl"
			>
				<Box
					maxW="7xl"
					mx="auto"
					px={{
						base: 4,
						lg: 8,
					}}
					as={motion.div}
					variants={parent}
					initial="hidden"
					animate={inView2 ? "visible" : "hidden"}
				>
					<Box
						textAlign={{
							lg: "center",
						}}
					>
						<chakra.h2
							_light={{
								color: "brand.600",
							}}
							fontWeight="semibold"
							textTransform="uppercase"
							letterSpacing="wide"
							mx={{ md: "auto", lg: "auto" }}
							maxW={{
								lg: "3xl",
								base: "md",
							}}
							textAlign={{ md: "center" }}
						>
							Spontaneous, Real-Time, Secure
						</chakra.h2>
						<chakra.p
							my={8}
							fontSize={{
								base: "3xl",
								lg: "4xl",
							}}
							fontWeight="semibold"
							letterSpacing="tight"
							_light={{
								color: "gray.900",
							}}
							maxW={{
								lg: "3xl",
								base: "md",
							}}
							textAlign={{ md: "center" }}
							mx={{ md: "auto", lg: "auto" }}
						>
							All the benefits of Omegle, with{" "}
							<chakra.span
								bgGradient={
									"linear(to-tl, brand.600, brand.400)"
								}
								bgClip="text"
							>
								none of the drawbacks.
							</chakra.span>
						</chakra.p>
						<chakra.p
							mt={4}
							fontSize={{ base: "lg", lg: "xl" }}
							color="gray.500"
							_dark={{
								color: "gray.400",
							}}
							textAlign={{ md: "center" }}
							mx={{ md: "auto", lg: "auto" }}
							maxW={{
								lg: "2xl",
								base: "xl",
							}}
						>
							By now, we all know Omegle had suspiscious users,
							inappropriate content, and a lack of features. We're
							here to change that.
						</chakra.p>
					</Box>

					<Box mt={10}>
						<Stack
							as={motion.div}
							spacing={{
								base: 10,
								md: 0,
							}}
							display={{
								md: "grid",
							}}
							gridTemplateColumns={{
								md: "repeat(2,1fr)",
							}}
							gridColumnGap={{
								md: 8,
							}}
							gridRowGap={{
								md: 10,
							}}
							ref={ref}
							variants={staggerContainer}
							initial="hidden"
							animate={inView ? "show" : "hidden"}
						>
							{offeringsData.map((offering, idx) => (
								<motion.div variants={item}>
									<Offering
										key={idx}
										title={offering.title}
										icon={offering.icon}
									>
										{offering.description}
									</Offering>
								</motion.div>
							))}
						</Stack>
					</Box>
				</Box>
			</Box>
		</Flex>
	);
};

export default Offerings;
