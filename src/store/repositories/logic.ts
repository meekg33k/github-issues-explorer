import { createLogic, Logic } from 'redux-logic';
import {
	FETCH_REPOSITORIES_FAILURE,
	FETCH_REPOSITORIES_REQUEST,
	FETCH_REPOSITORIES_SUCCESS,
} from './actions';
import { client } from '../../services/ApiClient';

export type FetchLogic = Logic<{}, any, any, any>; //Did this as a work-around for redux -- redux-logic type mismatch 

export const fetchRepositoriesLogic: FetchLogic = createLogic<{}, any, any, any>({
	type: FETCH_REPOSITORIES_REQUEST,
	latest: true,
	processOptions: {
		dispatchReturn: true,
		successType: FETCH_REPOSITORIES_SUCCESS,
		failType: FETCH_REPOSITORIES_FAILURE
	},
	process({ _, action }) {
		return client(action.payload).repos.listForAuthenticatedUser({
			/** Extra features - allow user to set config option */
			//per_page: 100: 
		});
	},
	warnTimeout: 0
});