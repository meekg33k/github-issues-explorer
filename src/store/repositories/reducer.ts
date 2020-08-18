import {
	FETCH_REPOSITORIES_FAILURE,
	FETCH_REPOSITORIES_REQUEST,
	FETCH_REPOSITORIES_SUCCESS,
	SET_SELECTED_RESPOSITORY
} from './actions';
import { FetchRepositoriesAction } from './types';
import { RepositoryListItem } from '../../components/ListItem';
import { parseErrorMessage, processRepositoriesFetchRes, objectify } from '../../utils';

export interface RepositoriesState {
	byId: {
		[key: string]: RepositoryListItem
	};
	error: string;
	items: RepositoryListItem[];
	loading: boolean;
	selectedRepository: string;
}

const initialState: RepositoriesState = {
	byId: {},
	error: '',
	items: [],
	loading: false,
	selectedRepository: ''
}

export const repositoryReducer = (state = initialState, action: FetchRepositoriesAction): RepositoriesState => {
	switch (action.type) {
		case SET_SELECTED_RESPOSITORY:
			return {
				...state,
				...{ selectedRepository: action.payload as string }
			}
		case FETCH_REPOSITORIES_REQUEST:
			return {
				...state,
				...{ loading: true }
			}
		case FETCH_REPOSITORIES_SUCCESS:
			const items = processRepositoriesFetchRes(action.payload.data);
			const byId = objectify(items);
			return {
				...state,
				...{
					byId,
					items,
					loading: false
				}
			}
		case FETCH_REPOSITORIES_FAILURE:
			return {
				...state,
				...{
					error: parseErrorMessage(action.payload.toString()),
					loading: false
				}
			};
		default:
			return state
	};
};