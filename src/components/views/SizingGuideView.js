import React, { Component, PropTypes } from 'react';
import { UIView } from '../ui';
import { SizingBox } from '../sections';
import './SizingGuideView.styl';

let isSizingHelpShown = false;

class SizingGuideView extends Component {
	constructor(props) {
		super(props);
		this.handleSBOptionsChange = this.handleSBOptionsChange.bind(this);
	}
	componentDidMount() {
		if (!isSizingHelpShown) {
			this.props.uiDispatch.openOverlay();
			isSizingHelpShown = true;
		}
	}
	handleSBOptionsChange() {
		console.log('hello!', this);
	}
	render() {
		return (
			<UIView name="sizing-guide-view">
				<SizingBox />
			</UIView>
		);
	}
}

SizingGuideView.propTypes = {
	uiDispatch: PropTypes.object.isRequired,
};

export default SizingGuideView;
