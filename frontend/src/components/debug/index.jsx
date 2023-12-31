import { Box, useBreakpointValue } from "@chakra-ui/react";

export function BreakpointDebug() {
	const width = useBreakpointValue({
		base: "xs",
		sm: "sm",
		md: "md",
		lg: "lg",
		xl: "xl",
	});

	return (
		<Box
			position="fixed"
			bottom="2"
			right="2"
			p="2"
			bg="gray.800"
			color="white"
			borderRadius="md"
			boxShadow="md"
			zIndex="999"
		>
			Current Breakpoint: {width}
		</Box>
	);
}
