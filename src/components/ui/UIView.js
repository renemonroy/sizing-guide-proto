import React, { PropTypes } from 'react';
import './UIView.styl';

const UIView = ({ name, children }) => (
	<div className={`ui-view ${name}`}>
		{children}
	</div>
);

UIView.propTypes = {
	children: PropTypes.any.isRequired,
	name: PropTypes.string.isRequired,
};

UIView.defaultProps = {
	title: '',
};

export default UIView;
