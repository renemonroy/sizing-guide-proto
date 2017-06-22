/**
 * This is a set of formulas to calculate Shoe Sizes on different metrics.
 */

const metrics = [
	{
		type: 'cm',
		formula: woman => Math.round(((woman - 1 + 22) / 3) * 254) / 100,
	},
	{
		type: 'inch',
		formula: cm => Math.round((cm / 2.54) * 100) / 100,
	},
	{
		type: 'man',
		formula: inch => Math.round(((inch * 3) - 22) * 2) / 2,
	},
	{
		type: 'woman',
		formula: man => man + 1,
	},
];

const getConversionsFrom = (value, metric) => {
	const indexOfMetric = metrics.findIndex(m => m.type === metric);
	const sizeOfMetrics = metrics.length;
	const conversions = {};
	let tempValue = value;

	conversions[metric] = value;

	for (let i=0; i<sizeOfMetrics; i+=1) {
		const curr = (i + indexOfMetric + 1) % sizeOfMetrics;
		if (metrics[curr].type !== metric) {
			conversions[metrics[curr].type] = metrics[curr].formula(tempValue);
			tempValue = conversions[metrics[curr].type];
		}
	}

	return conversions;
};

console.log(getConversionsFrom(11.5, 'inch'));
