import { combineReducers } from 'redux';
import ui from './ui';

const combinedReducers = combineReducers({
	ui,
});

export default combinedReducers;
