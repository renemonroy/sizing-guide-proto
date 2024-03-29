import { UIActions } from '../actions';

let isSizingHelpShown = false;

export const mapDispatchToProps = dispatch => ({
	uiDispatch: {
		openOverlay(e) {
			if (e) e.preventDefault();
			if (!isSizingHelpShown) {
				dispatch(UIActions.activateOverlay('SizingSteps'));
				isSizingHelpShown = true;
			}
		},
		openPicker(e) {
			if (e) e.preventDefault();
			dispatch(UIActions.activatePicker());
		},
	},
});

export const mapStateToProps = state => ({
	uiState: state.ui.toJS(),
});
