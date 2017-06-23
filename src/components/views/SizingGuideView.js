import React, { Component, PropTypes } from 'react';
import { UIView } from '../ui';
import ShoeSizeConverter from '../ShoeSizeConverter';
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
				<h2 className="ncss-brand fs22-sm u-uppercase pb4-sm">Shoe Size Converter</h2>
				<p>Use your measurements and the tool below to determine your shoe size.</p>
				<div className="tool-wrapper">
					<ShoeSizeConverter />
				</div>
				<p className="u-align-center fs12-sm text-color-grey">© 2017 Nike, Inc. All Rights Reserved.</p>
			</UIView>
		);
	}
}

SizingGuideView.propTypes = {
	uiDispatch: PropTypes.object.isRequired,
};

export default SizingGuideView;
