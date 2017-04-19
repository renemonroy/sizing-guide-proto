import { HomeView, SizingGuideView } from '../components/views';

const routes = [
	{
		path: '/',
		exact: true,
		component: HomeView,
		key: 'homeView',
	},
	{
		path: '/sizing-guide',
		exact: true,
		component: SizingGuideView,
		key: 'sizingGuideView',
	},
];

export default routes;
