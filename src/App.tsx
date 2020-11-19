import React from "react";
import "./App.css";
import { ApolloProvider } from "@apollo/client";
import { IconContextProps } from "phosphor-react/src/lib/index";
import { ThemeProvider } from "styled-components";
import { createApolloClient } from "./apollo-client";
import { GlobalStyles } from "./global";
import { Layout } from "./components/Layout/Layout";
import { lightTheme } from "./theme";
import { IconContext } from "phosphor-react";
import { useAuth0 } from "./components/Auth";

function App(): React.ReactElement {
	const { authToken } = useAuth0();

	const apolloClient = React.useMemo(() => {
		return createApolloClient(authToken);
	}, [ authToken ]);

	const [ menuOpen, setMenuOpen ] = React.useState(true);

	const iconContext = React.useMemo<IconContextProps>(() => {
		return {
			color: lightTheme.accent2,
			size: 36,
			weight: "regular",
			mirrored: false,
		};
	}, []);

	return (
		<ApolloProvider client={apolloClient}>
			<ThemeProvider theme={lightTheme}>
				<IconContext.Provider value={iconContext}>
					<GlobalStyles/>
					<Layout menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
				</IconContext.Provider>
			</ThemeProvider>
		</ApolloProvider>
	);
}

export default App;
