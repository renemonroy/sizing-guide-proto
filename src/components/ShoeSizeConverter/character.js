import React, { PropTypes } from 'react';
import cx from '../../utilities/className';
import cl from './_classes';
import './Character.styl';

const Character = ({ value, onRef, ...rest }) => (
	<div {...rest} ref={onRef} className={cx(cl.sscCharacter)}>
		{value}
	</div>
);

Character.propTypes = {
	value: PropTypes.string.isRequired,
	onRef: PropTypes.func.isRequired,
};

export default Character;
