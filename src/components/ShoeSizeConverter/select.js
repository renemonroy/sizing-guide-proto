import React, { Component, PropTypes } from 'react';
import Scroller from 'better-scroll';
import cx from '../../utilities/className';
import cl from './_classes';
import './select.styl';

class Select extends Component {

	constructor(props) {
		super(props);
		this.selectEl = null;
		this.scroller = null;
		this.index = props.index;
		this.triggerChange = this.triggerChange.bind(this);
	}

	componentDidMount() {
		this.startScroller();
	}

	componentWillUnmount() {
		this.scroller.destroy();
	}

	startScroller() {
		if (this.selectEl && this.props.choices.length > 0) {
			this.scroller = new Scroller(this.selectEl, {
				wheel: true,
				selectedIndex: this.index,
			});
			this.scroller.on('scrollEnd', this.triggerChange);
		}
	}

	triggerChange() {
		const index = this.scroller.getSelectedIndex();
		if (this.index !== index) {
			this.index = index;
			this.props.onChange(this.index);
		}
	}

	render() {
		const { choices, height, padding } = this.props;
		return (
			<div className="ssc-select">
				<div className={cx(cl.sscSelectTopMask)} style={{ height: padding }} />
				<div className={cx(cl.sscSelectBottomMask)} style={{ height: padding }} />
				<div
					className="ssc-select-scroller"
					ref={(el) => { this.selectEl = el; }}
					style={{ height }}
				>
					<ul className="ssc-select-list" style={{ marginTop: padding }}>
						{choices.length > 0 ? (
							choices.map(({ type, name }) => (
								<li key={`ssc-select-choice-type-${type}`} className="ssc-select-choice">
									<h3 className="ncss-brand ssc-select-choice-name u-align-center">{name}</h3>
								</li>
							))
						) : null}
					</ul>
				</div>
			</div>
		);
	}

}

Select.propTypes = {
	choices: PropTypes.arrayOf(PropTypes.object),
	index: PropTypes.number,
	onChange: PropTypes.func,
	padding: PropTypes.number,
	height: PropTypes.number,
};

Select.defaultProps = {
	choices: [],
	index: 0,
	onChange: () => {},
	padding: 68,
	height: 100,
};

export default Select;
