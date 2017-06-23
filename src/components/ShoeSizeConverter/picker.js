import React, { Component, PropTypes } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import { fastEaseIn, fastEaseOut } from '../../constants/SpringPresets';
import cx from '../../utilities/className';
import cl from './_classes';
import Select from './select';
import './picker.styl';

const selectorWillEnter = () => ({
	bottom: -667,
	opacity: 0,
});

const selectorWillLeave = () => ({
	bottom: spring(-667, fastEaseOut),
	opacity: spring(0, fastEaseOut),
});

const getSelectorStyles = active => (
	active ? [{
		key: 'ssc-selector-styles',
		style: {
			bottom: spring(0, fastEaseIn),
			opacity: spring(0.35, fastEaseIn),
		},
	}] : []
);

class Picker extends Component {

	constructor(props) {
		super(props);
		this.tempIndex = props.index;
		this.state = {
			active: false,
			index: props.index,
		};
		this.handleStart = this.handleStart.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleDone = this.handleDone.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
	}

	handleStart() {
		this.setState({ active: true });
	}

	handleCancel() {
		this.setState({ active: false });
	}

	handleDone() {
		this.setState({ active: false }, () => {
			setTimeout(() => {
				this.setState({ index: this.tempIndex }, () => {
					this.props.onDone(this.props.choices[this.state.index]);
				});
			}, 500);
		});
	}

	handleSelectChange(i) {
		this.tempIndex = i;
	}

	render() {
		const { choices, style, className: cn } = this.props;
		const { active, index } = this.state;
		const btnColor = active ? 'ncss-btn-black' : 'ncss-btn-white';
		return (
			<div className="ssc-picker">
				<button className={cx(['ssc-picker-trigger', btnColor, cn])} style={style} onClick={this.handleStart}>
					{choices[index].name}
				</button>
				<TransitionMotion
					styles={() => getSelectorStyles(active && choices.length > 0)}
					willEnter={selectorWillEnter}
					willLeave={selectorWillLeave}
				>
					{interpolatedStyles => (
						<div className="ssc-picker-selector-wrapper">
							{interpolatedStyles.map((config) => {
								const wrapperStyles = { bottom: config.style.bottom };
								return (
									<div key={config.key} className="ssc-picker-selector">
										<div
											className="ssc-picker-selector-mask"
											onClick={this.handleCancel}
											style={{ backgroundColor: `rgba(0, 0, 0, ${config.style.opacity})` }}
										/>
										<div className={cx(cl.sscSelectWrapper)} style={wrapperStyles}>
											<button className={cx(cl.sscPickerDeactivate)} onClick={this.handleDone}>
												Done
											</button>
											<Select
												choices={choices}
												index={index}
												onChange={this.handleSelectChange}
											/>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</TransitionMotion>
			</div>
		);
	}

}


Picker.propTypes = {
	choices: PropTypes.arrayOf(PropTypes.object),
	index: PropTypes.number.isRequired,
	onDone: PropTypes.func,
	style: PropTypes.object,
	className: PropTypes.string,
};

Picker.defaultProps = {
	choices: [],
	onDone: () => {},
	style: {},
	className: '',
};

export default Picker;
