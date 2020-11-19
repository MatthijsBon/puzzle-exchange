import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
	html, body {
		margin: 0;
		padding: 0;
	}
	*, *::after, *::before {
		box-sizing: border-box;
	}
	body {
		display: flex;
		justify-content: center;
		align-items: center;
		background: ${({ theme }) => theme.background};
		color: ${({ theme }) => theme.foreground};
		height: 100vh;
		text-rendering: optimizeLegibility;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	}
	div {
		text-align: center;
	}
	small {
		display: block;
	}
	a {
		color: ${({ theme }) => theme.accent1};
		text-decoration: none;
	}
`;