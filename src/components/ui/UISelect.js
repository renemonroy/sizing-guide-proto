import React, { Component, PropTypes } from 'react';
import Scroller from 'better-scroll';

import './UISelect.styl';

class UISelect extends Component {
	constructor(props) {
		super(props);
		this.selectEl = null;
		this.scroller = null;
		this.currentIndex = props.defaultIndex;
	}

	componentDidMount() {
		this.startScroller();
	}

	handleScrollerEnd() {
		const selectedIndex = this.scroller.getSelectedIndex();
		if (this.currentIndex !== selectedIndex) {
			this.currentIndex = selectedIndex;
			this.props.onChange(this.props.options[this.currentIndex], this.currentIndex);
		}
	}

	startScroller() {
		if (this.selectEl && this.props.options.length > 0) {
			this.scroller = new Scroller(this.selectEl, {
				wheel: true,
				selectedIndex: this.currentIndex,
			});
			this.scroller.on('scrollEnd', this.handleScrollerEnd.bind(this));
		}
	}

	render() {
		const { options, height, padding } = this.props;
		return (
			<div className="ui-select">
				<div
					className="ui-select-mask top-mask"
					style={{ height: padding }}
				/>
				<div
					className="ui-select-mask bottom-mask"
					style={{ height: padding }}
				/>
				<div
					className="ui-select-scroller"
					ref={(el) => { this.selectEl = el; }}
					style={{ height }}
				>
					<ul
						className="ui-select-list"
						style={{ marginTop: padding }}
					>
						{options.length > 0 ? (
							options.map(({ id, name }) => (
								<li key={`ui-select-option-${id}`} className="ui-select-option">
									<span className="ui-select-name">{name}</span>
								</li>
							))
						) : null}
					</ul>
				</div>
			</div>
		);
	}
}

UISelect.propTypes = {
	options: PropTypes.arrayOf(PropTypes.object),
	defaultIndex: PropTypes.number,
	onChange: PropTypes.func,
	padding: PropTypes.number,
	height: PropTypes.number,
};

UISelect.defaultProps = {
	options: [],
	defaultIndex: 0,
	onChange: () => {},
	padding: 68,
	height: 100,
};

export default UISelect;
