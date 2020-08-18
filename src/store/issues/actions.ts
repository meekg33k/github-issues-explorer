import {
	CancelFetchIssuesRequestAction,
	FetchIssuesRequestAction,
	FetchIssuesSuccessAction,
	SetIssuesSortOrderAction
} from './types';
import { FetchEntityFailureAction, FetchEntitySuccessPayload } from '../types';

export const CANCEL_FETCH_ISSUES_REQUEST = 'CANCEL_FETCH_ISSUES_REQUEST';
export const FETCH_ISSUES_REQUEST = 'FETCH_ISSUES_REQUEST';
export const FETCH_ISSUES_SUCCESS = 'FETCH_ISSUES_SUCCESS';
export const FETCH_ISSUES_FAILURE = 'FETCH_ISSUES_FAILURE';
export const SET_ISSUES_SORT_ORDER = 'SET_ISSUES_SORT_ORDER';

export const cancelFetchIssuesRequest = (): CancelFetchIssuesRequestAction => {
	return {
		type: CANCEL_FETCH_ISSUES_REQUEST,
	}
};

export const fetchIssuesRequest = (payload: { owner: string, repo: string, id: string }): FetchIssuesRequestAction => {
	return {
		type: FETCH_ISSUES_REQUEST,
		payload
	}
};

export const fetchIssuesSuccess = (payload: FetchEntitySuccessPayload): FetchIssuesSuccessAction => {
	return {
		type: FETCH_ISSUES_SUCCESS,
		payload
	}
};

export const fetchIssuesFailure = (error: string): FetchEntityFailureAction => {
	return {
		type: FETCH_ISSUES_FAILURE,
		error
	}
};

export const setIssuesSortOrder = (payload: { repoId: string, sortOrder: string[] }): SetIssuesSortOrderAction => {
	return {
		type: SET_ISSUES_SORT_ORDER,
		payload
	}
};