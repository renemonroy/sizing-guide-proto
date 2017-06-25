import React, { Component, PropTypes } from 'react';
import cx from '../../utilities/className';
import cl from './_classes';
import Picker from './Picker';
import Input from './animations/Input';
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
		this.leftMeasure = props.leftMeasure;
		this.rightMeasure = props.rightMeasure;
		this.state = {
			leftMeasureType: this.leftMeasure.type,
			leftMeasureValue: this.leftMeasure.value,
			rightMeasureType: this.rightMeasure.type,
			rightMeasureValue: this.rightMeasure.value,
		};
		this.handleLeftPickDone = this.handleLeftPickDone.bind(this);
		this.handleRightPickDone = this.handleRightPickDone.bind(this);
		this.handleLeftInputChange = this.handleLeftInputChange.bind(this);
		this.handleRightInputChange = this.handleRightInputChange.bind(this);
	}

	handleLeftPickDone({ type }) {
		let conversions = null;
		if (isNaN(this.leftMeasure.value)) return;
		conversions = getConversionsFromMeasure(type, this.leftMeasure.value);
		this.leftMeasure.type = type;
		this.rightMeasure.value = conversions[this.rightMeasure.type];
		this.setState({
			rightMeasureValue: this.rightMeasure.value,
		});
	}

	handleRightPickDone({ type }) {
		let conversions = null;
		if (isNaN(this.leftMeasure.value)) return;
		conversions = getConversionsFromMeasure(this.leftMeasure.type, this.leftMeasure.value);
		this.rightMeasure.type = type;
		this.rightMeasure.value = conversions[type];
		this.setState({
			rightMeasureValue: this.rightMeasure.value,
		});
	}

	handleLeftInputChange(val) {
		const value = Number(val);
		let conversions = null;
		if (isNaN(value)) return;
		conversions = getConversionsFromMeasure(this.leftMeasure.type, value);
		this.leftMeasure.value = value;
		this.setState({
			rightMeasureValue: conversions[this.rightMeasure.type],
		});
	}

	handleRightInputChange(val) {
		const value = Number(val);
		let conversions = null;
		if (isNaN(value)) return;
		conversions = getConversionsFromMeasure(this.rightMeasure.type, value);
		this.rightMeasure.value = value;
		this.setState({
			leftMeasureValue: conversions[this.leftMeasure.type],
		});
	}

	render() {
		const { leftMeasureType, leftMeasureValue, rightMeasureType, rightMeasureValue } = this.state;
		const leftPickerIndex = findMeasureIndexFromType(leftMeasureType);
		const rightPickerIndex = findMeasureIndexFromType(rightMeasureType);
		return (
			<div className={cx(cl.ssc)}>
				<div className={cx(cl.sscRow)}>
					<div className={cx(cl.sscCol)}>
						<Picker
							className={cx([cl.sscBtn, 'ssc-btn-left'])}
							choices={measures}
							index={leftPickerIndex}
							onDone={this.handleLeftPickDone}
						/>
						<Input
							key="left-input"
							className="ssc-input-left"
							data={[{
								id: `ssc-input-${leftMeasureType}-${leftMeasureValue}`,
								className: cx([cl.sscInput]),
								value: leftMeasureValue,
								onChange: this.handleLeftInputChange,
							}]}
						/>
					</div>
					<div className={cx(cl.sscCol)}>
						<Picker
							className={cx([cl.sscBtn, 'ssc-btn-right'])}
							choices={measures}
							index={rightPickerIndex}
							onDone={this.handleRightPickDone}
						/>
						<Input
							key="right-input"
							className="ssc-input-right"
							data={[{
								id: `ssc-input-${rightMeasureType}-${rightMeasureValue}`,
								className: cx([cl.sscInput]),
								value: rightMeasureValue,
								onChange: this.handleRightInputChange,
							}]}
						/>
					</div>
					<div className={cx(cl.sscDivider)}>
						<div className="divider" />
						<i className="ssc-arrow-icon g72-arrow-thick-right" />
					</div>
				</div>
			</div>
		);
	}

}

ShoeSizeConverter.propTypes = {
	leftMeasure: PropTypes.object,
	rightMeasure: PropTypes.object,
};

ShoeSizeConverter.defaultProps = {
	leftMeasure: {
		type: 'cm',
		value: 26.2,
	},
	rightMeasure: {
		type: 'men',
		value: 9,
	},
};

export default ShoeSizeConverter;
