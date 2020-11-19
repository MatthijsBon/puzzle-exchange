import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AUTH_CONFIG, Auth0Provider } from "./components/Auth";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
	<React.StrictMode>
		<Auth0Provider
			domain={AUTH_CONFIG.domain}
			client_id={AUTH_CONFIG.clientId}
			redirect_uri={AUTH_CONFIG.callbackUrl}
		>
			<App />
		</Auth0Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
