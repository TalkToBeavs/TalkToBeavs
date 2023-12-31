import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";

const theme = extendTheme({
	fontSizes: {
		xs: "0.75rem",
		sm: "0.875rem",
		base: "1rem",
		lg: "1.125rem",
		xl: "1.25rem",
		"2xl": "1.5rem",
		"3xl": "2rem",
		"4xl": "3.5rem",
		"5xl": "4rem",
		"6xl": "5rem",
		"7xl": "6rem",
		"8xl": "7.5rem",
		"9xl": "8.5rem",
	},
	fonts: {
		body: `Inter, -apple-system, system-ui, 'Segoe UI', Roboto, 'Helvetica', 'Arial', sans-serif`,
		heading: `Inter, -apple-system, system-ui, 'Segoe UI', Roboto, 'Helvetica', 'Arial', sans-serif`,
	},
	colors: {
		brand: {
			50: "#fff7ed",
			100: "#ffedd5",
			200: "#fedcb0",
			300: "#fdba7d",
			400: "#ff8a3d",
			500: "#ff5a00",
			600: "#e64d00",
			700: "#b33c00",
			800: "#802a00",
			900: "#4d1800",
		},
	},
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<>
		<ChakraProvider theme={theme}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ChakraProvider>
	</>
);
