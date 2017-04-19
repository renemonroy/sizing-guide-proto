import { UIActions } from '../actions';

let isSizingHelpShown = false;

export const mapDispatchToProps = dispatch => ({
	uiDispatch: {
		openOverlay(e) {
			if (e) e.preventDefault();
			if (!isSizingHelpShown) {
				dispatch(UIActions.activateOverlay('SizingHelp'));
				isSizingHelpShown = true;
			}
		},
	},
});

export const mapStateToProps = state => ({
	uiState: state.ui.toJS(),
});
