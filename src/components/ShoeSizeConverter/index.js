import React, { Component } from 'react';
import cx from '../../utilities/className';
import cl from './_classes';
import Picker from './picker';
import Input from './input';
import './index.styl';

const measures = [
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

const getConversionsFromMeasure = (measure, value) => {
	const measuresSize = measures.length;
	const indexOfMeasure = measures.findIndex(m => m.type === measure);
	const conversions = {};
	let tempValue = value;
	conversions[measure] = value;
	for (let i = 0; i < measuresSize; i += 1) {
		const curr = (i + indexOfMeasure + 1) % measuresSize;
		if (measures[curr].type !== measure) {
			conversions[measures[curr].type] = measures[curr].formula(tempValue);
			tempValue = conversions[measures[curr].type];
		}
	}
	return conversions;
};

const findMeasureIndexFromType = type => (
	measures.findIndex(measure => measure.type === type)
);

class ShoeSizeConverter extends Component {

	constructor(props) {
		super(props);
		this.state = {
			leftMeasure: {
				type: 'cm',
				value: 26.2,
			},
			rightMeasure: {
				type: 'men',
				value: 9,
			},
		};
		this.handleLeftPickDone = this.handleLeftPickDone.bind(this);
		this.handleRightPickDone = this.handleRightPickDone.bind(this);
		this.handleLeftInputChange = this.handleLeftInputChange.bind(this);
		this.handleRightInputChange = this.handleRightInputChange.bind(this);
	}

	handleLeftPickDone({ type }) {
		const { leftMeasure, rightMeasure } = this.state;
		const conversions = getConversionsFromMeasure(rightMeasure.type, rightMeasure.value);
		console.log(conversions);
		this.setState({
			leftMeasure: {
				type,
				value: type === leftMeasure.type ? leftMeasure.value : conversions[type],
			},
			rightMeasure: {
				type: rightMeasure.type,
				value: rightMeasure.value,
			},
		});
	}

	handleRightPickDone({ type }) {
		const { leftMeasure, rightMeasure } = this.state;
		const conversions = getConversionsFromMeasure(leftMeasure.type, leftMeasure.value);
		console.log(conversions);
		this.setState({
			leftMeasure: {
				type: leftMeasure.type,
				value: leftMeasure.value,
			},
			rightMeasure: {
				type,
				value: type === rightMeasure.type ? rightMeasure.value : conversions[type],
			},
		});
	}

	handleLeftInputChange(val) {
		const value = Number(val);
		const { leftMeasure, rightMeasure } = this.state;
		const conversions = getConversionsFromMeasure(leftMeasure.type, value);
		console.log(conversions);
		this.setState({
			leftMeasure: {
				type: leftMeasure.type,
				value,
			},
			rightMeasure: {
				type: rightMeasure.type,
				value: conversions[rightMeasure.type],
			},
		});
		return this;
	}

	handleRightInputChange(val) {
		const value = Number(val);
		const { leftMeasure, rightMeasure } = this.state;
		const conversions = getConversionsFromMeasure(rightMeasure.type, value);
		console.log(conversions);
		this.setState({
			leftMeasure: {
				type: leftMeasure.type,
				value: conversions[leftMeasure.type],
			},
			rightMeasure: {
				type: rightMeasure.type,
				value,
			},
		});
		return this;
	}

	render() {
		const { leftMeasure, rightMeasure } = this.state;
		const leftPickerIndex = findMeasureIndexFromType(leftMeasure.type);
		const rightPickerIndex = findMeasureIndexFromType(rightMeasure.type);
		return (
			<div className={cx(cl.ssc)}>
				<div className={cx(cl.sscRow)}>
					<div className={cx(cl.sscCol)}>
						<Picker
							key={`ssc-leftpicker-${leftPickerIndex}`}
							className={cx([cl.sscBtn, 'ssc-btn-left'])}
							choices={measures}
							index={findMeasureIndexFromType(leftMeasure.type)}
							onDone={this.handleLeftPickDone}
						/>
						<Input
							key={`ssc-input-${leftMeasure.type}-${leftMeasure.value}`}
							className={cx([cl.sscInput, 'ssc-input-left'])}
							value={leftMeasure.value}
							onChange={this.handleLeftInputChange}
						/>
					</div>
					<div className={cx(cl.sscCol)}>
						<Picker
							key={`ssc-rightpicker-${rightPickerIndex}`}
							className={cx([cl.sscBtn, 'ssc-btn-right'])}
							choices={measures}
							index={findMeasureIndexFromType(rightMeasure.type)}
							onDone={this.handleRightPickDone}
						/>
						<Input
							key={`ssc-input-${rightMeasure.type}-${rightMeasure.value}`}
							className={cx([cl.sscInput, 'ssc-input-right'])}
							value={rightMeasure.value}
							onChange={this.handleRightInputChange}
						/>
					</div>
					<div className={cx(cl.sscDivider)}>
						<div className="divider" />
					</div>
				</div>
			</div>
		);
	}

}

export default ShoeSizeConverter;
