import {
	FETCH_REPOSITORIES_FAILURE,
	FETCH_REPOSITORIES_REQUEST,
	FETCH_REPOSITORIES_SUCCESS,
	SET_SELECTED_RESPOSITORY
} from './actions';
import { FetchEntitySuccessPayload } from '../types';

export interface FetchRepositoriesFailureAction {
	type: typeof FETCH_REPOSITORIES_FAILURE;
	payload: string
}

export interface FetchRepositoriesRequestAction {
	type: typeof FETCH_REPOSITORIES_REQUEST;
	payload: string
}

export interface FetchRepositoriesSuccessAction {
	type: typeof FETCH_REPOSITORIES_SUCCESS;
	payload: FetchEntitySuccessPayload
}

export interface SetSelectedRepositoryAction {
	type: typeof SET_SELECTED_RESPOSITORY;
	payload: string
}

export type FetchRepositoriesAction =
	FetchRepositoriesFailureAction | FetchRepositoriesRequestAction | FetchRepositoriesSuccessAction | SetSelectedRepositoryAction