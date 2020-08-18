import {
	FETCH_ISSUES_FAILURE,
	FETCH_ISSUES_REQUEST,
	FETCH_ISSUES_SUCCESS,
	SET_ISSUES_SORT_ORDER,
	fetchIssuesFailure,
	fetchIssuesRequest,
	fetchIssuesSuccess,
	setIssuesSortOrder,
} from './actions';
import { FetchEntityFailureAction } from '../types';
import { FetchIssuesRequestAction, FetchIssuesSuccessAction, SetIssuesSortOrderAction } from './types';

describe('Issues Action Creators', () => {
	const mockError = 'mockError';
	const mockOwner = 'mockOwner';
	const mockRepo = {
		title: 'mockRepoTitle',
		id: 'mockRepoID'
	}

	test('Creates the `fetchIssuesFailure` action correctly', () => {
		const expectedAction: FetchEntityFailureAction = {
			type: FETCH_ISSUES_FAILURE,
			error: mockError
		}
		expect(fetchIssuesFailure(mockError)).toEqual(expectedAction);
	});

	test('Creates the `fetchIssuesRequest` action correctly', () => {
		const expectedAction: FetchIssuesRequestAction = {
			type: FETCH_ISSUES_REQUEST,
			payload: {
				owner: mockOwner,
				repo: mockRepo.title,
				id: mockRepo.id
			}
		}
		expect(fetchIssuesRequest({
			owner: mockOwner,
			repo: mockRepo.title,
			id: mockRepo.id
		})).toEqual(expectedAction);
	});

	test('Creates the `fetchIssuesSuccess` action correctly', () => {
		const mockIssuesData: [] = []
		const expectedAction: FetchIssuesSuccessAction = {
			type: FETCH_ISSUES_SUCCESS,
			payload: {
				id: mockRepo.id,
				data: mockIssuesData
			}
		}
		expect(fetchIssuesSuccess({ id: mockRepo.id, data: mockIssuesData })).toEqual(expectedAction);
	});

	test('Creates the `setIssuesSortOrder` action correctly', () => {
		const mockSortOrder = ['1', '2', '3'];
		const mockPayload = {
			repoId: mockRepo.id,
			sortOrder: mockSortOrder
		};
		const expectedAction: SetIssuesSortOrderAction = {
			type: SET_ISSUES_SORT_ORDER,
			payload: mockPayload
		}
		expect(setIssuesSortOrder(mockPayload)).toEqual(expectedAction);
	});
});