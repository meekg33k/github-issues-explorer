import { IssuesAction } from "./types";
import {
	FETCH_ISSUES_FAILURE,
	FETCH_ISSUES_SUCCESS,
	SET_ISSUES_SORT_ORDER
} from './actions';
import { parseErrorMessage, processIssuesFetchRes, objectify, getFromSessionStorage } from '../../utils';
import { IssueListItem } from '../../components/ListItem';

export interface IssuesState {
	error: string;
	byId: {
		[key: string]: IssueListItem
	};
	byRepository: {
		[key: string]: IssueListItem[]
	};
	loading: boolean;
}

export const initialState: IssuesState = {
	error: '',
	byRepository: {},
	byId: {},
	loading: false,
}

export const applySortOrderToIssuesListData = (byId: { [key: string]: IssueListItem }, sortOrder: string[]) => {
	return sortOrder.filter((issueId) => byId[issueId]).map((issueId, index) => {
		return {
			...byId[issueId],
			...{ index }
		};
	});
}

export const updateIssuesForRepository = (state: IssuesState, items: IssueListItem[], repositoryId: string) => {
	const issuesByRepositoryState = state.byRepository;
	const byRepository = {
		...issuesByRepositoryState,
		...{
			[repositoryId!]: items
		}
	};
	return byRepository;
};

export const issueReducer = (state = initialState, action: IssuesAction) => {
	switch (action.type) {
		case FETCH_ISSUES_SUCCESS:
			let items = processIssuesFetchRes(action.payload.data);
			const byId = objectify(items);
			const repositoryId = action.payload.id;
			let byRepository: { [key: string]: IssueListItem[] } = {};

			//Check if issues sort order exists in sessionStorage for the selected repository
			const sortOrder = getFromSessionStorage(repositoryId!);
			if (sortOrder) {
				items = applySortOrderToIssuesListData(byId, sortOrder);
			}

			byRepository = updateIssuesForRepository(state, items, repositoryId!);
			return {
				...state,
				...{
					byId,
					byRepository,
					loading: false
				}
			}
		case FETCH_ISSUES_FAILURE:
			return {
				...state,
				...{
					error: parseErrorMessage(action.payload.toString()),
					loading: false
				}
			};
		case SET_ISSUES_SORT_ORDER:
			const sortedItems = applySortOrderToIssuesListData(state.byId, action.payload.sortOrder);
			return {
				...state,
				...{
					byRepository: updateIssuesForRepository(state, sortedItems, action.payload.repoId)
				}
			}
		default:
			return state
	};
};