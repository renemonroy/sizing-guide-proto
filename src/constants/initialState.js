import { fromJS } from 'immutable';

export const ui = fromJS({
	requestRefresh: false,
	overlay: {
		active: false,        // To show/hide overlay
		component: '',        // Name of the component to append
	},
});
