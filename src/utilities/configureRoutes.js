import { HomeView } from '../components/views';

export default () => (
	[
		{
			path: '/',
			exact: true,
			component: HomeView,
			key: 'home-view',
		},
	]
);
