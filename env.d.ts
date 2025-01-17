declare namespace NodeJS {
	interface ProcessEnv {
		readonly AUTH_PASSWORD: string;
		readonly API_KEY: string;
		readonly AUTH_DOMAIN: string;
		readonly PROJECT_ID: string;
		readonly STORAGEBUCKET: string;
		readonly MESSAGING_SENDER: string;
		readonly APP_ID: string;
	}
}
