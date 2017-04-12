import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { UIActions } from '../../actions';
import './index.styl';

const UIOverlay = ({ children, closeOverlay }) => (
	<div className="ui-overlay">
		<div
			className="ui-overlay-background"
			onClick={closeOverlay}
		/>
		<div className="ui-overlay-content">
			{children}
		</div>
	</div>
);

UIOverlay.propTypes = {
	children: PropTypes.any.isRequired,
	closeOverlay: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
	closeOverlay(e) {
		e.preventDefault();
		dispatch(UIActions.deactivateOverlay());
	},
});

export default connect(null, mapDispatchToProps)(UIOverlay);
