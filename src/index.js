import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/app';
import mainSaga from './sagas';
import configureStore from './utilities/configureStore';
import './index.styl';

const store = configureStore();
store.runSaga(mainSaga);

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<Provider store={store}>
			<Router>
				<Route component={App} />
			</Router>
		</Provider>,
		document.getElementById('root'),
  );
});
