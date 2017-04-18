import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { UIOverlay, UIRoutesManager } from '../ui';
import { UIActions } from '../../actions';
import overlayRegistry from '../../utilities/overlayRegistry';

const getOverlayContent = componentName => (
	componentName !== '' ? overlayRegistry[componentName]() : null
);

const App = ({ routes, openOverlay, ui }) => (
	<div id="app">
		<nav>
			<ul>
				<li><a onClick={openOverlay}>Sizing Guide</a></li>
			</ul>
		</nav>
		<UIRoutesManager routes={routes} />
		<UIOverlay active={ui.overlay.active}>
			{getOverlayContent(ui.overlay.component)}
		</UIOverlay>
	</div>
);

App.propTypes = {
	routes: PropTypes.array.isRequired,
	openOverlay: PropTypes.func.isRequired,
	ui: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	ui: state.ui.toJS(),
});

const mapDispatchToProps = dispatch => ({
	openOverlay(e) {
		e.preventDefault();
		dispatch(UIActions.activateOverlay('SizingHelp'));
	},
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
