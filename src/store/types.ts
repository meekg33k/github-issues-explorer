import { RepositoriesState } from './repositories/reducer';
import { IssuesState } from './issues/reducer';
import { NO_ACTION } from '../constants';

export interface FetchEntityFailureAction {
	type: string;
	error: string;
}

export interface FetchEntitySuccessPayload {
	id?: string;
	data: any[];
}

export interface ApplicationState {
	issues: IssuesState;
	repositories: RepositoriesState;
}

export interface NoAction {
	type: typeof NO_ACTION;
}