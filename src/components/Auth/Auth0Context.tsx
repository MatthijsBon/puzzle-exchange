import React from "react";
import createAuth0Client, {
	Auth0ClientOptions, getIdTokenClaimsOptions,
	GetTokenSilentlyOptions,
	GetTokenWithPopupOptions,
	IdToken, LogoutOptions,
	PopupLoginOptions,
	RedirectLoginOptions,
	RedirectLoginResult,
} from "@auth0/auth0-spa-js";
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";

interface Auth0Context {
  isAuthenticated: boolean;
  user: any;
  authToken: string;
  loading: boolean;
  popupOpen: boolean;
  loginWithPopup: (options: PopupLoginOptions) => Promise<void>;
  handleRedirectCallback: () => Promise<RedirectLoginResult>;
  getIdTokenClaims: (o?: getIdTokenClaimsOptions) => Promise<IdToken>;
  loginWithRedirect: (o: RedirectLoginOptions) => Promise<void>;
  getTokenSilently: (o?: GetTokenSilentlyOptions) => Promise<string | undefined>;
  getTokenWithPopup: (o?: GetTokenWithPopupOptions) => Promise<string | undefined>;
  logout: (o?: LogoutOptions) => void;
}
interface Auth0ProviderOptions {
  onRedirectCallback?(result: RedirectLoginResult): void;
}

const DEFAULT_REDIRECT_CALLBACK = () =>
	window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext<Auth0Context | null>(null);

export const useAuth0 = (): Auth0Context => {
	const auth0Context = React.useContext(Auth0Context);
	if (auth0Context === null) {
		throw new Error("Expected context not to be null");
	}
	return auth0Context;
};

export const Auth0Provider = ({
	children,
	onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
	...initOptions
}: Auth0ProviderOptions & Auth0ClientOptions): React.ReactElement => {
	const [ isAuthenticated, setIsAuthenticated ] = React.useState(false);
	const [ user, setUser ] = React. useState();
	const [ auth0Client, setAuth0 ] = React.useState<Auth0Client>();
	const [ loading, setLoading ] = React.useState<boolean>(true);
	const [ popupOpen, setPopupOpen ] = React.useState<boolean>(false);
	const [ idToken, setIdToken ] = React.useState<string>("");

	React.useEffect(() => {
		const initAuth0 = async () => {
			const auth0FromHook = await createAuth0Client(initOptions);
			setAuth0(auth0FromHook);

			if (window.location.search.includes("code=")) {
				const { appState } = await auth0FromHook.handleRedirectCallback();
				onRedirectCallback(appState);
			}

			const isAuthenticated = await auth0FromHook.isAuthenticated();

			setIsAuthenticated(isAuthenticated);

			if (isAuthenticated) {
				const user = await auth0FromHook.getUser();
				setUser(user);
				const idTokenClaims = await auth0FromHook.getIdTokenClaims();
				setIdToken(idTokenClaims.__raw);
			}

			setLoading(false);
		};
		initAuth0();
		// eslint-disable-next-line
  }, []);

	const loginWithPopup = async (o: PopupLoginOptions) => {
		setPopupOpen(true);
		try {
			await auth0Client!.loginWithPopup(o);
		} catch (error) {
			console.error(error);
		} finally {
			setPopupOpen(false);
		}
		const user = await auth0Client!.getUser();
		setUser(user);
		setIsAuthenticated(true);
	};

	const handleRedirectCallback = async () => {
		setLoading(true);
		const result = await auth0Client!.handleRedirectCallback();
		const user = await auth0Client!.getUser();
		const idTokenClaims = await auth0Client!.getIdTokenClaims();
		setIdToken(idTokenClaims.__raw);

		setLoading(false);
		setIsAuthenticated(true);
		setUser(user);
		return result;
	};

	const context: Auth0Context = {
		isAuthenticated: isAuthenticated,
		user: user,
		authToken: idToken,
		loading: loading,
		popupOpen: popupOpen,
		loginWithPopup: loginWithPopup,
		handleRedirectCallback: handleRedirectCallback,
		getIdTokenClaims: (o: getIdTokenClaimsOptions | undefined) => {
			if (!auth0Client) {
				throw new Error("auth0Client is not expected to be undefined | null");
			}
			return auth0Client.getIdTokenClaims(o);
		},
		loginWithRedirect: (o: RedirectLoginOptions) => {
			if (!auth0Client) {
				throw new Error("auth0Client is not expected to be undefined | null");
			}
			return auth0Client.loginWithRedirect(o);
		},
		getTokenSilently: (o: GetTokenSilentlyOptions | undefined) => {
			if (!auth0Client) {
				throw new Error("auth0Client is not expected to be undefined | null");
			}
			return auth0Client.getTokenSilently(o);
		},
		getTokenWithPopup: (o: GetTokenWithPopupOptions | undefined) => {
			if (!auth0Client) {
				throw new Error("auth0Client is not expected to be undefined | null");
			}
			return auth0Client.getTokenWithPopup(o);
		},
		logout: (o: LogoutOptions | undefined) => {
			if (!auth0Client) {
				throw new Error("auth0Client is not expected to be undefined | null");
			}
			return auth0Client.logout(o);
		},
	};

	return (
		<Auth0Context.Provider value={context}>
			{children}
		</Auth0Context.Provider>
	);
};
