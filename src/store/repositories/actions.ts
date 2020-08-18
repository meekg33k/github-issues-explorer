import {
	FetchRepositoriesRequestAction,
	FetchRepositoriesSuccessAction,
	SetSelectedRepositoryAction,
} from './types';
import {
	FetchEntityFailureAction,
	FetchEntitySuccessPayload
} from '../types';

export const FETCH_REPOSITORIES_REQUEST = 'FETCH_REPOSITORIES_REQUEST';
export const FETCH_REPOSITORIES_SUCCESS = 'FETCH_REPOSITORIES_SUCCESS';
export const FETCH_REPOSITORIES_FAILURE = 'FETCH_REPOSITORIES_FAILURE';
export const SET_SELECTED_RESPOSITORY = 'SET_SELECTED_RESPOSITORY';

export const fetchRepositoriesRequest = (token: string): FetchRepositoriesRequestAction => {
	return {
		type: FETCH_REPOSITORIES_REQUEST,
		payload: token
	}
};

export const fetchRepositoriesFailure = (error: string): FetchEntityFailureAction => {
	return {
		type: FETCH_REPOSITORIES_FAILURE,
		error
	}
}

export const fetchRepositoriesSuccess = (payload: FetchEntitySuccessPayload): FetchRepositoriesSuccessAction => {
	return {
		type: FETCH_REPOSITORIES_SUCCESS,
		payload
	}
}

export const setSelectedRepository = (repositoryId: string): SetSelectedRepositoryAction => {
	return {
		type: SET_SELECTED_RESPOSITORY,
		payload: repositoryId
	}
};