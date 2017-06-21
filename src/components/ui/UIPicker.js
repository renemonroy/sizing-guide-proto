import React, { Component, PropTypes } from 'react';
import UISelect from './UISelect';

import './UIPicker.styl';

class UIPicker extends Component {
	constructor(props) {
		super(props);
		this.selectorIndex = props.defaultIndex;
		this.tempIndex = this.selectorIndex;
		this.state = {
			active: false,
			selectedIndex: this.selectorIndex,
		};
		this.handleActivate = this.handleActivate.bind(this);
		this.handleDeactivate = this.handleDeactivate.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleActivate() {
		this.setState({ active: true });
	}

	handleDeactivate() {
		setTimeout(() => {
			this.setState({ active: false, selectedIndex: this.tempIndex });
		}, 500);
	}

	handleChange(data, i) {
		this.tempIndex = i;
	}

	render() {
		const { options } = this.props;
		const { active, selectedIndex } = this.state;
		return (
			<div className="ui-picker">
				<button className="ui-picker-trigger" onClick={this.handleActivate}>
					{options[selectedIndex].name}
				</button>
				{active && options.length > 0 ? (
					<div className="ui-picker-selector">
						<div className="ui-picker-mask" />
						<div className="ui-select-wrapper border-top-dark-grey">
							<button
								className="ncss-brand ncss-btn-white ui-picker-deactivate"
								onClick={this.handleDeactivate}
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
				) : null}
			</div>
		);
	}
}

UIPicker.propTypes = {
	options: PropTypes.arrayOf(PropTypes.object),
	defaultIndex: PropTypes.number,
};

UIPicker.defaultProps = {
	options: [],
	defaultIndex: 0,
};

export default UIPicker;
