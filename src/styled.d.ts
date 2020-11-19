import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		background: string,
		foreground: string,
		accent1: string,
		accent2: string,
		accent3: string,
		mobile: string,
	}
}