import React, { PropTypes } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import { slowEaseIn, slowEaseOut } from '../../../constants/SpringPresets';
import cx from '../../../utilities/className';
import cl from '../_classes';
import Input from '../Input';
import './Input.styl';

const inputsList = [];

const willEnter = () => ({
	top: -80,
	opacity: 0.5,
});

const willLeave = () => ({
	top: spring(100, slowEaseOut),
	opacity: spring(0.5, slowEaseOut),
});

const styles = allInputs => (allInputs.map(inputData => ({
	key: inputData.id,
	style: {
		top: spring(0, slowEaseIn),
		opacity: spring(1, slowEaseIn),
	},
	data: inputData,
})));

const AnimateInput = ({ className, ...rest }) => {
	inputsList[0] = Object.assign({}, rest);
	return (
		<TransitionMotion
			willEnter={willEnter}
			willLeave={willLeave}
			styles={styles(inputsList)}
		>
			{interpolatedStyles => (
				<div className={cx(['ssc-input-animator', className])}>
					{interpolatedStyles.map(({ key, data, style }) => (
						<div key={key} className="ssc-input-wrapper">
							<Input
								className={cx(cl.sscInput)}
								style={style}
								value={data.value}
								onChange={data.onChange}
							/>
						</div>
					))}
				</div>
			)}
		</TransitionMotion>
	);
};

AnimateInput.propTypes = {
	id: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	onChange: PropTypes.func.isRequired,
	className: PropTypes.string,
};

AnimateInput.defaultProps = {
	className: '',
};

export default AnimateInput;
