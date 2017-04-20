import React, { PropTypes } from 'react';

const UICharacter = (props) => {
	const { value, onRef, ...rest } = props;
	return (
		<div
			{...rest}
			ref={(el) => { onRef(el); }}
			className="ui-input-character ncss-brand"
		>
			{value}
		</div>
	);
};

UICharacter.propTypes = {
	value: PropTypes.string.isRequired,
	onRef: PropTypes.func,
};

UICharacter.defaultProps = {
	onRef: () => {},
};

export default UICharacter;
