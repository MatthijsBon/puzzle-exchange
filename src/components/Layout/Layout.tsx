import React from "react";
import { Burger } from "../Burger";
import { NavBar } from "../Menu";
import { StyledLayout, StyledTitleLogo } from "./Layout.styled";
import logo from "./logo.svg";

const TitleLogo = (): React.ReactElement => {
	return <StyledTitleLogo>
		<img src={logo} alt="logo" width="60px" />
		<h2>Puzzle-Exchange</h2>
	</StyledTitleLogo>;
};

interface LayoutProps {
	menuOpen: boolean;
	setMenuOpen: (open: boolean) => void;
}

export const Layout = ({ menuOpen, setMenuOpen }: LayoutProps): React.ReactElement => {
	return <StyledLayout menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
		<div className="header">
			<Burger menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
			<TitleLogo/>
		</div>
		<div className="content">
			{/* Todo add content*/}
		</div>
		{menuOpen && <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>}
		<div className="footer">
			See <a href="http://github.com" target="_blank" rel="noreferrer">github</a> for more.
		</div>
	</StyledLayout>;
};