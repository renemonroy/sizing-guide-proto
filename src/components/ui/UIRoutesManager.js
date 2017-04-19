import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utilities/mapPropsHelpers';
import routes from '../../utilities/routes';

const UIRoutesManager = props => (
	<Switch>
		{routes.map(({ key, path, component: Component, exact }) => (
			<Route
				key={key}
				path={path}
				exact={exact}
				render={ps => (
					<Component {...(Object.assign({}, ps, props))} />
				)}
			/>
		))}
	</Switch>
);

export default connect(mapStateToProps, mapDispatchToProps)(UIRoutesManager);
