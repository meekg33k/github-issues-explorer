import { Octokit } from '@octokit/rest';

let API_TOKEN = '';
let HTTP_CLIENT: Octokit;

export const client = (token: string): Octokit => {
	if (token && API_TOKEN !== token) {
		HTTP_CLIENT = new Octokit({
			auth: token,
		});
	}

	return HTTP_CLIENT;
}