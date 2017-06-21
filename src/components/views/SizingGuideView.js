import React, { Component, PropTypes } from 'react';
import { UIView } from '../ui';
import UIPicker from '../ui/UIPicker';

import './SizingGuideView.styl';

let isSizingHelpShown = false;

const selectOptions = [
	{ id: 1, name: 'MEN', value: 'men' },
	{ id: 2, name: 'WOMEN', value: 'women' },
	{ id: 3, name: 'YOUTH', value: 'youth' },
	{ id: 4, name: 'LENGTH (CM)', value: 'length_cm' },
	{ id: 5, name: 'LENGTH (IN)', value: 'length_in' },
];

class SizingGuideView extends Component {
	constructor(props) {
		super(props);
		this.onPickerDone = this.onPickerDone.bind(this);
	}

	componentDidMount() {
		if (!isSizingHelpShown) {
			this.props.uiDispatch.openOverlay();
			isSizingHelpShown = true;
		}
	}

	onPickerDone(data) {
		console.log('hello!', data);
		return this;
	}

	render() {
		return (
			<UIView name="sizing-guide-view">
				<UIPicker
					options={selectOptions}
					defaultIndex={2}
					onDone={this.onPickerDone}
				/>
			</UIView>
		);
	}
}

SizingGuideView.propTypes = {
	uiDispatch: PropTypes.object.isRequired,
};

export default SizingGuideView;
