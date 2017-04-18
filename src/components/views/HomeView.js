import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { UIView } from '../ui';
import { mapDispatchToProps } from '../../utilities/mapPropsHelpers';
import './HomeView.styl';

const HomeView = ({ uiDispatch }) => (
	<UIView name="home-view">
		<nav>
			<ul>
				<li><a onClick={uiDispatch.openOverlay}>Sizing Guide</a></li>
			</ul>
		</nav>
	</UIView>
);

HomeView.propTypes = {
	uiDispatch: PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(HomeView);
