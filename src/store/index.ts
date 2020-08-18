import { applyMiddleware, createStore } from 'redux';
import { createLogicMiddleware } from 'redux-logic';
import rootReducer from './rootReducer';
import rootLogic from './rootLogic';

const logicMiddleware = createLogicMiddleware(rootLogic, {});

const middleware = applyMiddleware(
	logicMiddleware
);

const configureStore = () => {
	const store = createStore(rootReducer, middleware);
	return store;
}

export default configureStore();