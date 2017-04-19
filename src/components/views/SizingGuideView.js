import React, { Component, PropTypes } from 'react';
import { UIView } from '../ui';
import './SizingGuideView.styl';

let isSizingHelpShown = false;

class SizingGuideView extends Component {
	componentDidMount() {
		if (!isSizingHelpShown) {
			this.props.uiDispatch.openOverlay();
			isSizingHelpShown = true;
		}
	}
	render() {
		return (
			<UIView name="sizing-guide-view">
				<h1>Sizing Guide View</h1>
			</UIView>
		);
	}
}

SizingGuideView.propTypes = {
	uiDispatch: PropTypes.object.isRequired,
};

export default SizingGuideView;
