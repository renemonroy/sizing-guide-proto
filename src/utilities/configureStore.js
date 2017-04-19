import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import reducers from '../reducers';

export default () => {
	const sagaMiddleware = createSagaMiddleware();
	const loggerMiddleware = createLogger();
	const middleware = applyMiddleware(
		sagaMiddleware,
		loggerMiddleware,
	);
	const store = createStore(reducers, middleware);
	store.runSaga = sagaMiddleware.run;
	return store;
};
