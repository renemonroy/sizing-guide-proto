import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { mapStateToProps, mapDispatchToProps } from '../../utilities/mapPropsHelpers';

const UIPrivateRoute = ({
	uiState,
	uiDispatch,
	component: Component,
	...rest
}) => (
	<Route
		{...rest}
		render={ps => (
			<Component
				{...ps}
				uiState={uiState}
				uiDispatch={uiDispatch}
			/>
		)}
	/>
);

UIPrivateRoute.propTypes = {
	component: PropTypes.any.isRequired,
	uiState: PropTypes.object.isRequired,
	uiDispatch: PropTypes.object.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(UIPrivateRoute);
