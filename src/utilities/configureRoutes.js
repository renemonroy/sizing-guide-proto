import { HomeView, SizingGuideView } from '../components/views';

export default () => (
	[
		{
			path: '/',
			exact: true,
			component: HomeView,
			key: 'home-view',
		},
		{
			path: '/sizing-guide',
			component: SizingGuideView,
			key: 'sizing-guide-view',
		},
	]
);
