import React, { PropTypes } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import { slowEaseIn, slowEaseOut } from '../../../constants/SpringPresets';
import cx from '../../../utilities/className';
import Input from '../Input';
import './Input.styl';

const willEnter = () => ({
	top: -80,
	opacity: 0.5,
});

const willLeave = () => ({
	top: spring(100, slowEaseOut),
	opacity: spring(0.5, slowEaseOut),
});

const styles = allData => (allData.map(data => ({
	key: data.id,
	style: {
		top: spring(0, slowEaseIn),
		opacity: spring(1, slowEaseIn),
	},
	data,
})));

const AnimateInput = ({ data, className }) => (
	<TransitionMotion
		willEnter={willEnter}
		willLeave={willLeave}
		styles={styles(data)}
	>
		{interpolatedStyles => (
			<div className={cx(['ssc-input-animator', className])}>
				{interpolatedStyles.map(({ key, data: d, style }) => (
					<div key={key} className="ssc-input-wrapper">
						<Input
							className={d.className}
							style={style}
							value={d.value}
							onChange={d.onChange}
						/>
					</div>
				))}
			</div>
		)}
	</TransitionMotion>
);

AnimateInput.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			className: PropTypes.string.isRequired,
			value: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number,
			]).isRequired,
			onChange: PropTypes.func.isRequired,
		}).isRequired,
	).isRequired,
	className: PropTypes.string,
};

AnimateInput.defaultProps = {
	className: '',
};

export default AnimateInput;
