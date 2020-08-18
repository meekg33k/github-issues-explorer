import { combineReducers } from 'redux';
import { issueReducer } from './issues/reducer';
import { repositoryReducer } from './repositories/reducer';

const rootReducer = combineReducers({ issues: issueReducer, repositories: repositoryReducer });
export default rootReducer;