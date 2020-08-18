import {
	CANCEL_FETCH_ISSUES_REQUEST,
	FETCH_ISSUES_FAILURE,
	FETCH_ISSUES_REQUEST,
	FETCH_ISSUES_SUCCESS,
	SET_ISSUES_SORT_ORDER
} from './actions';
import { FetchEntitySuccessPayload, NoAction } from '../types';

export interface CancelFetchIssuesRequestAction {
	type: typeof CANCEL_FETCH_ISSUES_REQUEST;
}

export interface FetchIssuesRequestAction {
	type: typeof FETCH_ISSUES_REQUEST;
	payload: {
		owner: string;
		repo: string;
		id: string;
	};
}

export interface FetchIssuesFailureAction {
	type: typeof FETCH_ISSUES_FAILURE;
	payload: string
}

export interface FetchIssuesSuccessAction {
	type: typeof FETCH_ISSUES_SUCCESS;
	payload: FetchEntitySuccessPayload;
}

export interface SetIssuesSortOrderAction {
	type: typeof SET_ISSUES_SORT_ORDER;
	payload: { repoId: string, sortOrder: string[] }
}


export type IssuesAction = CancelFetchIssuesRequestAction | FetchIssuesFailureAction | FetchIssuesRequestAction
	| FetchIssuesSuccessAction | SetIssuesSortOrderAction | NoAction;