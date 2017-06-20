import React, { Component, PropTypes } from 'react';
import { UIView } from '../ui';
import UISelect from '../ui/UISelect';
import './SizingGuideView.styl';

let isSizingHelpShown = false;

const selectOptions = [
	{ id: 1, name: 'MEN', value: 'men' },
	{ id: 2, name: 'WOMEN', value: 'women' },
	{ id: 3, name: 'YOUTH', value: 'youth' },
	{ id: 4, name: 'LENGTH (CM)', value: 'length-cm' },
	{ id: 5, name: 'LENGTH (IN)', value: 'length-in' },
];

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
				<UISelect
					options={selectOptions}
					onChange={(item) => { console.log(item); }}
				/>
			</UIView>
		);
	}
}

SizingGuideView.propTypes = {
	uiDispatch: PropTypes.object.isRequired,
};

export default SizingGuideView;
