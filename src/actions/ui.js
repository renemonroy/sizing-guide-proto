import ActionTypes from '../constants/actionTypes';

export default {
	requestRefresh: refresh => ({
		type: ActionTypes.UI_REQUEST_REFRESH,
		requestRefresh: refresh,
	}),
	activateOverlay: component => ({
		type: ActionTypes.UI_ACTIVATE_OVERLAY,
		component,
	}),
	deactivateOverlay: () => ({
		type: ActionTypes.UI_DEACTIVATE_OVERLAY,
	}),
};
