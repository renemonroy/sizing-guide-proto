import React, { Component } from 'react';
import { UIInput } from '../ui';
import UIPicker from '../ui/UIPicker';
import cx from '../../utilities/className';
import cl from './SizingBoxClasses';
import './SizingBox.styl';

const metrics = [
	{
		type: 'cm',
		name: 'Length (cm)',
		formula: woman => Math.round(((woman - 1 + 22) / 3) * 254) / 100,
	},
	{
		type: 'inch',
		name: 'Length (in)',
		formula: cm => Math.round((cm / 2.54) * 100) / 100,
	},
	{
		type: 'men',
		name: 'Men',
		formula: inch => Math.round(((inch * 3) - 22) * 2) / 2,
	},
	{
		type: 'women',
		name: 'Women',
		formula: man => man + 1,
	},
];

const getConversionsFrom = (value, metric) => {
	const indexOfMetric = metrics.findIndex(m => m.type === metric);
	const sizeOfMetrics = metrics.length;
	const conversions = {};
	let tempValue = value;
	conversions[metric] = value;
	for (let i=0; i<sizeOfMetrics; i+=1) {
		const curr = (i + indexOfMetric + 1) % sizeOfMetrics;
		if (metrics[curr].type !== metric) {
			conversions[metrics[curr].type] = metrics[curr].formula(tempValue);
			tempValue = conversions[metrics[curr].type];
		}
	}
	return conversions;
};

const options = metrics.map((metric) => {
	const newMetric = Object.assign({}, metric);
	newMetric.value = metric.type;
	delete newMetric.type;
	delete newMetric.formula;
	return newMetric;
});

const findIndexOfType = type => options.findIndex(opt => opt.value === type);

class SizingBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			leftType: 'cm',
			leftValue: 26.2,
			rightType: 'men',
			rightValue: 9,
		};
		this.handleLeftPick = this.handleLeftPick.bind(this);
		this.handleRightPick = this.handleRightPick.bind(this);
	}

	handleLeftPick(data) {
		const { leftValue, rightType } = this.state;
		const conversions = getConversionsFrom(leftValue, data.value);
		console.log(data);
		console.log(conversions);
		this.setState({ rightValue: conversions[rightType] });
	}

	handleRightPick(data) {
		console.log(data);
		return this;
	}

	render() {
		const { leftType, leftValue, rightType, rightValue } = this.state;
		console.log(this.state);
		return (
			<div className={cx(cl.sizingBox)}>
				<div className={cx(cl.sizingBoxRow)}>
					<div className={cx(cl.sizingBoxCol)}>
						<UIPicker
							className={cx([cl.sizingBoxBtn, cl.sizingBoxBtnLeft])}
							options={options}
							defaultIndex={findIndexOfType(leftType)}
							onDone={this.handleLeftPick}
						/>
						<UIInput
							key={`ui-input-${leftValue}`}
							className={cx([cl.sizingBoxInput, cl.sizingBoxInputLeft])}
							value={leftValue}
						/>
					</div>
					<div className={cx(cl.sizingBoxCol)}>
						<UIPicker
							className={cx([cl.sizingBoxBtn, cl.sizingBoxBtnRight])}
							options={options}
							defaultIndex={findIndexOfType(rightType)}
							onDone={this.handleRightPick}
						/>
						<UIInput
							key={`ui-input-${rightValue}`}
							className={cx([cl.sizingBoxInput, cl.sizingBoxInputRight])}
							value={rightValue}
						/>
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
