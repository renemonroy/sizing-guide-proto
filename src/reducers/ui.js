import { fromJS } from 'immutable';
import { ui as initialState } from '../constants/initialState';
import ActionType from '../constants/actionTypes';

export const requestRefresh = (state, refresh) => (
	state.set('requestRefresh', fromJS(refresh))
);

export const activateOverlay = (state, component) => (
	state.mergeIn(['overlay'], fromJS({ active: true, component }))
);

export const deactivateOverlay = state => (
	state.mergeIn(['overlay'], fromJS({ active: false }))
);

function UI(state = initialState, action) {
	switch (action.type) {
	case ActionType.UI_REQUEST_REFRESH:
		return requestRefresh(state, action.requestRefresh);
	case ActionType.UI_ACTIVATE_OVERLAY:
		return activateOverlay(state, action.component);
	case ActionType.UI_DEACTIVATE_OVERLAY:
		return deactivateOverlay(state);
	default:
		return state;
	}
}

export default UI;
