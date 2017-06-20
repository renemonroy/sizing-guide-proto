import React, { Component, PropTypes } from 'react';
import { UIInput } from '../ui';
import cx from '../../utilities/className';
import cl from './SizingBoxClasses';
import './SizingBox.styl';

/**
 * Data used by each picker
 * -----------------------------------------------------------------------------
 */

const metrics = [
	{ text: 'Men', value: 1 },
	{ text: 'Women', value: 2 },
	{ text: 'Youth', value: 3 },
	{ text: 'Length (cm)', value: 4 },
	{ text: 'Length (in)', value: 5 },
];

/**
 * Components used in the main Sizing Box component
 * -----------------------------------------------------------------------------
 */

const SBDivider = () => (
	<div className={cx(cl.sizingBoxDivider)}>
		<div className="divider" />
	</div>
);

const SBLeftSide = ({ name, onPick }) => (
	<div className={cx(cl.sizingBoxCol)}>
		<button
			className={cx([cl.sizingBoxBtn, cl.sizingBoxBtnLeft])}
			onClick={onPick}
		>
			{ name }
		</button>
		<UIInput className={cx([cl.sizingBoxInput, cl.sizingBoxInputLeft])} />
	</div>
);

const SBRightSide = ({ name, onPick }) => (
	<div className={cx(cl.sizingBoxCol)}>
		<button
			className={cx([cl.sizingBoxBtn, cl.sizingBoxBtnRight])}
			onClick={onPick}
		>
			{ name }
		</button>
		<UIInput className={cx([cl.sizingBoxInput, cl.sizingBoxInputRight])} />
	</div>
);

const SBWrapper = ({ children }) => (
	<div className={cx(cl.sizingBox)}>
		<div className={cx(cl.sizingBoxRow)}>
			{ children }
		</div>
	</div>
);

/**
 * Sizing Box component
 * -----------------------------------------------------------------------------
 */

class SizingBox extends Component {
	constructor(props) {
		super(props);
		this.handleLeftPick = this.handleLeftPick.bind(this);
		this.handleRightPick = this.handleRightPick.bind(this);
	}

	handleLeftPick() {
		this.leftPicker.show();
	}

	handleRightPick() {
		this.rightPicker.show();
	}

	render() {
		return (
			<SBWrapper>
				<SBLeftSide
					name="Length (cm)"
					onPick={this.props}
				/>
				<SBRightSide
					name="Men"
					onPick={this.handleRightPick}
				/>
				<SBDivider />
			</SBWrapper>
		);
	}
}

/**
 * PropTypes used for the main component and its children
 * -----------------------------------------------------------------------------
 */

SBLeftSide.propTypes = {
	name: PropTypes.string.isRequired,
	onPick: PropTypes.func.isRequired,
};

SBRightSide.propTypes = {
	name: PropTypes.string.isRequired,
	onPick: PropTypes.func.isRequired,
};

SBWrapper.propTypes = {
	children: PropTypes.any.isRequired,
};

export default SizingBox;
