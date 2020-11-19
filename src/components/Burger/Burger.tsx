import React from "react";
import { StyledBurger } from "./Burger.styled";

interface BurgerProps {
	menuOpen: boolean;
	setMenuOpen: (open: boolean) => void
}

export const Burger = ({ menuOpen, setMenuOpen }: BurgerProps): React.ReactElement => {
	const onClick = React.useCallback(() => {
		setMenuOpen(!menuOpen);
	}, [ menuOpen, setMenuOpen ]);

	return (
		<StyledBurger menuOpen={menuOpen} onClick={onClick}>
			<div />
			<div />
			<div />
		</StyledBurger>
	);
};