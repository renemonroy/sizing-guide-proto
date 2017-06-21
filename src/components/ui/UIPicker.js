import React, { Component, PropTypes } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import UISelect from './UISelect';
import { fastEaseIn, fastEaseOut } from '../../constants/SpringPresets';
import cx from '../../utilities/className';

import './UIPicker.styl';

const selectorWillEnter = () => ({
	bottom: -667,
});

const selectorWillLeave = () => ({
	bottom: spring(-667, fastEaseOut),
});

const getSelectorStyles = active => (
	active ? [{
		key: 'ui-selector-styles',
		style: {
			bottom: spring(0, fastEaseIn),
		},
	}] : []
);

class UIPicker extends Component {
	constructor(props) {
		super(props);
		this.selectorIndex = props.defaultIndex;
		this.state = {
			active: false,
			selectedIndex: this.selectorIndex,
		};
		this.handleStart = this.handleStart.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleDone = this.handleDone.bind(this);
		this.handleChange = this.handleChange.bind(this);
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
				this.setState({ selectedIndex: this.selectorIndex });
				this.props.onDone(this.props.options[this.selectorIndex]);
			}, 500);
		});
	}

	handleChange(data, i) {
		this.selectorIndex = i;
	}

	render() {
		const { options, style, className } = this.props;
		const { active, selectedIndex } = this.state;
		return (
			<div className="ui-picker">
				<button className={cx(['ui-picker-trigger', className])} style={style} onClick={this.handleStart}>
					{options[selectedIndex].name}
				</button>
				<TransitionMotion
					styles={() => getSelectorStyles(active && options.length > 0)}
					willEnter={selectorWillEnter}
					willLeave={selectorWillLeave}
				>
					{interpolatedStyles => (
						<div className="ui-picker-selector-wrapper">
							{interpolatedStyles.map(config => (
								<div
									key={config.key}
									className="ui-picker-selector"
								>
									<div className="ui-picker-selector-mask" />
									<div
										className="ui-select-wrapper border-top-grey"
										style={{ bottom: config.style.bottom }}
									>
										<button
											className="ncss-brand ncss-btn-white ui-picker-deactivate"
											onClick={this.handleDone}
										>
											Done
										</button>
										<UISelect
											defaultIndex={selectedIndex}
											options={options}
											onChange={this.handleChange}
										/>
									</div>
								</div>
							))}
						</div>
					)}
				</TransitionMotion>
			</div>
		);
	}
}

UIPicker.propTypes = {
	options: PropTypes.arrayOf(PropTypes.object),
	defaultIndex: PropTypes.number,
	onDone: PropTypes.func,
	style: PropTypes.object,
	className: PropTypes.string,
};

UIPicker.defaultProps = {
	options: [],
	defaultIndex: 0,
	onDone: () => {},
	style: {},
	className: '',
};

export default UIPicker;
