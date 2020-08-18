import { createLogic } from 'redux-logic';
import {
	CANCEL_FETCH_ISSUES_REQUEST,
	FETCH_ISSUES_REQUEST,
	FETCH_ISSUES_FAILURE,
	FETCH_ISSUES_SUCCESS,
} from './actions';
import { client } from '../../services/ApiClient';
import { FetchLogic } from '../repositories/logic';

export const fetchIssuesLogic: FetchLogic = createLogic<{}, any, any, any>({
	type: FETCH_ISSUES_REQUEST,
	cancelType: CANCEL_FETCH_ISSUES_REQUEST,
	latest: true,
	process({ _, action }, dispatch, done) {
		const { owner, repo, id } = action.payload;
		client('').issues.listForRepo({
			owner,
			repo
		})
			.then(res => res.data)
			.then(data => dispatch({
				type: FETCH_ISSUES_SUCCESS,
				payload: { id, data }
			}))
			.catch(err => {
				console.error(err);
				dispatch({
					type: FETCH_ISSUES_FAILURE,
					payload: err,
					error: true
				})
			})
			.then(() => done());

	},
	warnTimeout: 0
});