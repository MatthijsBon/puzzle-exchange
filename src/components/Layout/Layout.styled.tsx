import styled from "styled-components";

export const StyledTitleLogo = styled.a`
	display: flex;
	flex-flow: row;
	align-items: center;
`;
export const StyledNavigation = styled.div`
	border-radius: 4px;
	padding: 5px;

	a.active {
		background-color: #0093ba;
		color: white;
	}
`;

interface StyledLayoutProps {
	menuOpen: boolean;
	setMenuOpen: (open: boolean) => void;
}

export const StyledLayout = styled.div<StyledLayoutProps>`
	display: grid;
	height: 100vh;
	grid-template-columns: 0.5fr 2fr 0.5fr;
  	grid-template-rows: 0.2fr 2fr 0.2fr;
	grid-template-areas:
		"header header header"
		". content ."
		"footer footer footer";
	grid-gap: 10px;

	div.header {
		grid-area: header;
		padding: 1rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		overflow: hidden;
	}

	div.content {
		grid-area: content;
		flex: 1 1 auto;
		height: 100%
		width: 100%
	}

	div.navbar {
		display: flex;
	}

	div.footer {
		grid-area: footer;
	}
`;