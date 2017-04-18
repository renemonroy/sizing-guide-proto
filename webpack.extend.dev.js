module.exports = {
	module: {
		rules: [
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: 'url-loader',
			}
		]
	}
};