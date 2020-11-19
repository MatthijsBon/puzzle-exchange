import styled from "styled-components";

interface StyledNavBarProps {
	menuOpen: boolean;
}

export const StyledNavBar = styled.div<StyledNavBarProps>`
	display: flex;
	flex: 1 1 auto;
	flex-flow: column nowrap;
	background: ${({ theme }) => theme.foreground};
	height: 100vh;
	padding: 1rem 2rem;
	position: absolute;
	transition: transform 0.3s ease-in-out;
	transform: ${({ menuOpen }) => menuOpen ? "translateX(0)" : "translateX(-100%)"};

	@media (max-width: ${({ theme }) => theme.mobile}) {
		width: 100%;
	}

	div {
		text-align: center;
	}

	div.menu-toggle {
		display: flex;
	}

	div.menu-links {
		flex: 1 1 auto;
	}

	div.menu-actions {
		// flex: 1 1 auto;
	}

	div.link {
		display: flex;
		font-size: 2rem;
		text-transform: uppercase;
		padding: 2rem 0;
		font-weight: bold;
		letter-spacing: 0.5rem;
		color: ${({ theme }) => theme.accent2};
		align-items: center;
		text-decoration: none;
		transition: color 0.3s linear;

		@media (max-width: ${({ theme }) => theme.mobile}) {
			font-size: 1.5rem;
			text-align: center;
		}

		&:hover {
			color: ${({ theme }) => theme.accent1};
		}
	}
`;