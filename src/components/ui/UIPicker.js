import React, { Component, PropTypes } from 'react';
import UISelect from './UISelect';

import './UIPicker.styl';

class UIPicker extends Component {
	constructor(props) {
		super(props);
		this.selectorIndex = 0;
		this.state = {
			active: false,
		};
		this.handleActivate = this.handleActivate.bind(this);
		this.handleDeactivate = this.handleDeactivate.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleActivate() {
		this.setState({ active: true });
	}

	handleDeactivate() {
		this.setState({ active: false });
	}

	handleChange(data) {
		console.log(data);
		return this;
	}

	render() {
		const { children, options } = this.props;
		const { active } = this.state;
		return (
			<div className="ui-picker">
				<button className="ui-picker-trigger" onClick={this.handleActivate}>
					{children}
				</button>
				{active && options.length > 0 ? (
					<div className="ui-picker-selector">
						<div className="ui-picker-mask" />
						<div className="ui-select-wrapper">
							<button onClick={this.handleDeactivate}>Done</button>
							<UISelect
								defaultIndex={this.selectorIndex}
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
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
};

UIPicker.defaultProps = {
	options: [],
};

export default UIPicker;
