import React from "react";
import { Switch } from "antd";
import { useDarkMode } from "../../var/useDarkMode";
import { Burger } from "../Burger";
import { StyledNavBar } from "./NavBar.styled";
import { MagnifyingGlass, User } from "phosphor-react";

interface NavBarProps {
	menuOpen: boolean;
	setMenuOpen: (open: boolean) => void;
}

export const NavBar = ({ menuOpen, setMenuOpen }: NavBarProps): React.ReactElement => {
	const [ darkMode, setDarkMode ] = useDarkMode();
	return (
		<StyledNavBar menuOpen={menuOpen} className="navbar">
			<div className="menu-toggle">
				<Burger menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
			</div>
			<div className="menu-links">
				<div className="link">
					<MagnifyingGlass weight="bold"/>
					Browse puzzles
				</div>
				<div className="link">
					<User weight="bold"/>
					Profile
				</div>
			</div>
			<div className="menu-actions">
				<Switch onChange={setDarkMode} unCheckedChildren="Light-mode" checkedChildren="Dark-mode"/>
			</div>
		</StyledNavBar>
	);
};