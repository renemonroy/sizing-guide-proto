import React, { PropTypes } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import { connect } from 'react-redux';
import UIPlaceholder from './UIPlaceholder';
import { UIActions } from '../../actions';
import { easeOut, fastEaseIn, fastEaseOut, fastEaseInElastic } from '../../constants/SpringPresets';
import './UIOverlay.styl';

const overlayWillEnter = () => ({
	opacity: 0,
	top: -667,
});

const overlayWillLeave = () => ({
	opacity: spring(0, easeOut),
	top: spring(-667, fastEaseOut),
});

const getOverlayStyles = active => (
	active ? [{
		key: 'ui-overlay',
		style: {
			opacity: spring(1, fastEaseIn),
			top: spring(0, fastEaseInElastic),
		},
	}] : []
);

const UIOverlay = ({ children, active, closeOverlay }) => (
	<TransitionMotion
		styles={() => getOverlayStyles(active)}
		willEnter={overlayWillEnter}
		willLeave={overlayWillLeave}
	>
		{interpolatedStyles => (
			<div className="ui-overlay-wrapper">
				{interpolatedStyles.map(config => (
					<div
						key={config.key}
						className="ui-overlay"
						style={{ opacity: config.style.opacity }}
					>
						<div
							className="ui-overlay-content"
							style={{ top: config.style.top }}
						>
							<div
								className="ui-overlay-background"
								onClick={closeOverlay}
							/>
							{children || <UIPlaceholder />}
						</div>
					</div>
				))}
			</div>
		)}
	</TransitionMotion>
);

UIOverlay.propTypes = {
	children: PropTypes.any,
	active: PropTypes.bool,
	closeOverlay: PropTypes.func.isRequired,
};

UIOverlay.defaultProps = {
	children: null,
	active: false,
};

const mapDispatchToProps = dispatch => ({
	closeOverlay(e) {
		e.preventDefault();
		dispatch(UIActions.deactivateOverlay());
	},
});

export default connect(null, mapDispatchToProps)(UIOverlay);
