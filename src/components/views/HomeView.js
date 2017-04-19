import React from 'react';
import { Link } from 'react-router-dom';
import { UIView } from '../ui';
import './HomeView.styl';

const HomeView = (props) => {
	console.log('>>> HomeView props:', props);
	return (
		<UIView name="home-view">
			<nav>
				<ul>
					<li><Link to="/sizing-guide">Sizing Guide</Link></li>
				</ul>
			</nav>
		</UIView>
	);
};

export default HomeView;
