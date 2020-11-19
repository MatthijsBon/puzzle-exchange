import { ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { NormalizedCacheObject } from "@apollo/client/cache/inmemory/types";

declare const process: {
	env: {
		REACT_APP_API_URL: string
		REACT_APP_AUTH0_DOMAIN: string
		REACT_APP_AUTH0_CLIENT_ID: string
		REACT_APP_GRAPHQL_ACCESS_TOKEN: string
	}
};

export const createApolloClient = (authToken?: string): ApolloClient<NormalizedCacheObject> => {
	return new ApolloClient({
		link: new WebSocketLink({
			uri: `${process.env.REACT_APP_API_URL}`,
			options: {
				reconnect: true,
				connectionParams: authToken ? {
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				} : {},
			},
		}),
		cache: new InMemoryCache(),
	});
};