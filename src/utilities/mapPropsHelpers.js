import { push } from 'react-router-redux';
import { UIActions } from '../actions';

let isSizingHelpShown = false;

export const mapDispatchToProps = dispatch => ({
	uiDispatch: {
		openOverlay(e) {
			e.preventDefault();
			dispatch(push('/sizing-guide'));
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
