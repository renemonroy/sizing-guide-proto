import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { TransitionMotion, spring } from 'react-motion';
import UIPlaceholder from './UIPlaceholder';
import { UIActions } from '../../actions';
import { fastEaseInElastic } from '../../constants/SpringPresets';

const pickerWillEnter = () => ({
	bottom: -667,
});

const getPickerStyles = active => (
	active ? [{
		key: 'ui-overlay',
		style: {
			bottom: spring(0, fastEaseInElastic),
		},
	}]: []
);

const mapDispatchToProps = dispatch => ({
	closePicker(e) {
		e.preventDefault();
		dispatch(UIActions.deactivatePicker());
	},
});

const UIPicker = ({ children, active, closePicker }) => (
	<TransitionMotion
		styles={() => getPickerStyles(active)}
		willEnter={pickerWillEnter}
	>
		{interpolatedStyles => (
			<div className="ui-picker-wrapper">
				{interpolatedStyles.map(config => (
					<div
						key={config.key}
						className="ui-picker"
					>
						<div
							className="ui-picker-content"
							style={{ bottom: config.style.bottom }}
						>
							<div
								className="ui-picker-background"
								onClick={closePicker}
							/>
							{children || <UIPlaceholder />}
						</div>
					</div>
				))}
			</div>
		)}
	</TransitionMotion>
);

UIPicker.propTypes = {
	children: PropTypes.any,
	active: PropTypes.bool,
	closePicker: PropTypes.func.isRequired,
};

UIPicker.defaultProps = {
	children: null,
	active: false,
};

export default connect(null, mapDispatchToProps)(UIPicker);
