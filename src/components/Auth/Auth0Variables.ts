declare const process: {
	env: {
		REACT_APP_API_URL: string
		REACT_APP_AUTH0_DOMAIN: string
		REACT_APP_AUTH0_CLIENT_ID: string
		REACT_APP_GRAPHQL_ACCESS_TOKEN: string
	}
};

export const AUTH_CONFIG = {
	domain: process.env.REACT_APP_AUTH0_DOMAIN,
	clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
	callbackUrl: "http://localhost:3000",
};
