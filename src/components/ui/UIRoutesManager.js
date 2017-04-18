import React, { PropTypes } from 'react';
import { Switch } from 'react-router-dom';
import { UIRoute } from '../ui';

const UIRoutesManager = ({ routes }) => (
	<Switch>
		{routes.map(route => (
			<UIRoute {...route} />
		))}
	</Switch>
);

UIRoutesManager.propTypes = {
	routes: PropTypes.array.isRequired,
};

UIRoutesManager.defaultProps = {
	routes: [],
};

export default UIRoutesManager;
