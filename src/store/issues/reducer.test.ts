import {
	FETCH_ISSUES_FAILURE,
	FETCH_ISSUES_SUCCESS,
	SET_ISSUES_SORT_ORDER,
} from './actions';
import {
	applySortOrderToIssuesListData,
	initialState,
	issueReducer,
	IssuesState,
	updateIssuesForRepository
} from './reducer';
import { NO_ACTION, DEFAULT_ERR_MSG } from '../../constants';
import { objectify, processIssuesFetchRes } from '../../utils';
import { IssueListItem } from '../../components/ListItem';
import { createMockIssueListItems } from '../../testUtils';


describe('Issues Reducer', () => {
	const mockRepoId = 'mockRepoId';
	const mockIssueId = 'mockIssueId';
	const mockIssuesDataFromAPI: any[] = [
		{ assignee: { avatar_url: '1', login: '1' }, created_at: '1', id: mockIssueId, title: '1', updated_at: '1', url: '1' }
	];
	const mockIssues: IssueListItem[] = createMockIssueListItems(['1', '2', '3']);
	const mockSortOrder: string[] = ['3', '1', '2'];
	const mockIssuesState: IssuesState = {
		...initialState,
		...{
			byRepository: {
				[mockRepoId]: mockIssues
			},
			byId: objectify(mockIssues),
		}
	};

	test('Set the initial state for issues correctly', () => {
		expect(issueReducer(initialState, { type: NO_ACTION })).toEqual(initialState);
	});

	test('Updates state correctly when there is a `FETCH_ISSUES_SUCCESS`', () => {
		const issues = processIssuesFetchRes(mockIssuesDataFromAPI);
		const issuesState = issueReducer(
			initialState,
			{
				type: FETCH_ISSUES_SUCCESS,
				payload: {
					data: mockIssuesDataFromAPI,
					id: mockRepoId
				}
			}
		);
		const expectedIssuesState = {
			error: '',
			byId: objectify(issues),
			byRepository: {
				[mockRepoId]: issues
			},
			loading: false
		}
		expect(issuesState).toEqual(expectedIssuesState);
	});

	test('Sets error state correctly when there is a `FETCH_ISSUES_FAILURE`', () => {
		const mockIssuesError = DEFAULT_ERR_MSG;
		const issuesState = issueReducer(
			initialState,
			{
				type: FETCH_ISSUES_FAILURE,
				payload: mockIssuesError
			}
		);
		const expectedIssuesState = {
			...initialState,
			...{ error: mockIssuesError }
		};
		expect(issuesState).toEqual(expectedIssuesState);
	});

	test('Updates state correctly on `SET_ISSUES_SORT_ORDER`', () => {
		const issuesState = issueReducer(
			mockIssuesState,
			{
				type: SET_ISSUES_SORT_ORDER,
				payload: { repoId: mockRepoId, sortOrder: mockSortOrder }
			}
		);
		const expectedIssuesState = {
			...mockIssuesState,
			...{
				byRepository: {
					[mockRepoId]: createMockIssueListItems(mockSortOrder)
				},
				byId: objectify(mockIssues),
			}
		}
		expect(issuesState).toEqual(expectedIssuesState);
	});
});

describe('Issues Reducer Helper Functions', () => {
	const mockIssues: IssueListItem[] = createMockIssueListItems(['1', '2', '3']);
	const mockRepoId = 'mockRepoId';
	const mockSortOrder: string[] = ['3', '1', '2'];
	const mockIssuesState: IssuesState = {
		...initialState,
		...{
			byRepository: {
				[mockRepoId]: mockIssues
			},
			byId: objectify(mockIssues),
		}
	};

	test('Applies sort order to existing issues', () => {
		expect(
			applySortOrderToIssuesListData(
				mockIssuesState.byId,
				mockSortOrder
			)
		).toEqual(createMockIssueListItems(mockSortOrder));
	});

	test('Updates `byRepository` attribute correctly after sort is applied', () => {
		const issuesWithSortOrderApplied = createMockIssueListItems(mockSortOrder);
		expect(
			updateIssuesForRepository(
				mockIssuesState,
				issuesWithSortOrderApplied,
				mockRepoId
			)
		).toEqual(
			{
				[mockRepoId]: issuesWithSortOrderApplied
			},
		);
	});
});