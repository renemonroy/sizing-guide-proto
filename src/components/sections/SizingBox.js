import React, { Component } from 'react';
import { UIInput } from '../ui';
import UIPicker from '../ui/UIPicker';
import cx from '../../utilities/className';
import cl from './SizingBoxClasses';
import './SizingBox.styl';

/**
 * Data used by each picker
 * -----------------------------------------------------------------------------
 */

const metrics = [
	{ id: 1, name: 'Men', value: 'men' },
	{ id: 2, name: 'Women', value: 'women' },
	{ id: 3, name: 'Youth', value: 'youth' },
	{ id: 4, name: 'Length (cm)', value: 'length_cm' },
	{ id: 5, name: 'Length (in)', value: 'length_in' },
];

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

	handleLeftPick(data) {
		console.log(data);
		return this;
	}

	handleRightPick(data) {
		console.log(data);
		return this;
	}

	render() {
		return (
			<div className={cx(cl.sizingBox)}>
				<div className={cx(cl.sizingBoxRow)}>
					<div className={cx(cl.sizingBoxCol)}>
						<UIPicker
							className={cx([cl.sizingBoxBtn, cl.sizingBoxBtnLeft])}
							options={metrics}
							defaultIndex={1}
							onDone={this.handleLeftPick}
						/>
						<UIInput className={cx([cl.sizingBoxInput, cl.sizingBoxInputLeft])} />
					</div>
					<div className={cx(cl.sizingBoxCol)}>
						<UIPicker
							className={cx([cl.sizingBoxBtn, cl.sizingBoxBtnRight])}
							options={metrics}
							defaultIndex={2}
							onDone={this.handleRightPick}
						/>
						<UIInput className={cx([cl.sizingBoxInput, cl.sizingBoxInputRight])} />
					</div>
					<div className={cx(cl.sizingBoxDivider)}>
						<div className="divider" />
					</div>
				</div>
			</div>
		);
	}
}

export default SizingBox;
