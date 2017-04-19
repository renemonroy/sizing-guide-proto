import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { UIOverlay, UIRoutesManager } from '../ui';
import overlayRegistry from '../../utilities/overlayRegistry';
import { mapStateToProps, mapDispatchToProps } from '../../utilities/mapPropsHelpers';

const getOverlayContent = componentName => (
	componentName !== '' ? overlayRegistry[componentName]() : null
);

const App = props => (
	<div id="app">
		<UIRoutesManager location={props.location} />
		<UIOverlay active={props.uiState.overlay.active}>
			{getOverlayContent(props.uiState.overlay.component)}
		</UIOverlay>
	</div>
);

App.propTypes = {
	uiState: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
