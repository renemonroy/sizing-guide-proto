import React, { Component } from 'react';
import './UICursor.styl';

class UICursor extends Component {
	move() {
		const offset = this.element.get(0).offsetLeft;
		console.log(offset);
	}
	render() {
		return (
			<div
				ref={(el) => { this.element = el; }}
				className="ui-cursor"
			/>
		);
	}
}

export default UICursor;
