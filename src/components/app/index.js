import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { UIOverlay, UIRoutesManager } from '../ui';
import overlayRegistry from '../../utilities/overlayRegistry';
import { mapStateToProps, mapDispatchToProps } from '../../utilities/mapPropsHelpers';

const getOverlayContent = componentName => (
	componentName !== '' ? overlayRegistry[componentName]() : null
);

const App = ({ routes, uiState }) => (
	<div id="app">
		<UIRoutesManager routes={routes} />
		<UIOverlay active={uiState.overlay.active}>
			{getOverlayContent(uiState.overlay.component)}
		</UIOverlay>
	</div>
);

App.propTypes = {
	routes: PropTypes.array.isRequired,
	uiState: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
