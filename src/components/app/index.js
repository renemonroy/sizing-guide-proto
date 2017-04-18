import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { UIOverlay, UIRoutesManager } from '../ui';
import { UIActions } from '../../actions';
import overlayRegistry from '../../utilities/overlayRegistry';

const App = ({ routes, openOverlay, ui }) => (
	<div id="app">
		<nav>
			<ul>
				<li><a onClick={openOverlay}>Steps Overlay</a></li>
			</ul>
		</nav>
		<UIRoutesManager routes={routes} />
		{ ui.overlay.active ?
			<UIOverlay>{overlayRegistry[ui.overlay.component]}</UIOverlay>
			: null
		}
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
		dispatch(UIActions.activateOverlay('GuideSteps'));
	},
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
