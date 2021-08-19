import ReactECharts from 'echarts-for-react';

// dark theme color
import { DarkColor } from './color';

// i18n hook
import { useTranslation } from 'react-i18next';

const MultipleDateStackLineCahrt = ({ forecastday, darkMode }) => {
	const { t } = useTranslation();
	// cal yAxis min and max in order that the chart will more focus on that area
	// Cal the highest and lowest temp then the yAxis could be more focus for the temp
	const calGreatest = (forecastday, minOrMax) => {
		let arr = [];
		(forecastday || []).forEach((day) => {
			const hTempCarr = day?.hour?.map((h) => h.temp_c);
			arr.push(...hTempCarr);
		});
		if (minOrMax === 'min') {
			return Math.min(...arr);
		} else {
			return Math.max(...arr);
		}
	};

	// cal legends
	const calLegends = (forecastday) => {
		const arr = [];
		forecastday.forEach((day) => {
			arr.push({
				name: day.date,
				icon: `image://${day?.day?.condition?.icon}`
			});
		});
		return arr;
	};

	// cal data for series
	const calData = (forecastday) => {
		const series = [];
		(forecastday || []).forEach((day) => {
			let singleDateData = {
				data: [],
				animation: false,
				type: 'line',
				smooth: true,
				name: day.date,
				showSymbol: false
			};
			(day.hour || []).forEach((h) => {
				const { temp_c, condition, time } = h;
				singleDateData.data.push({
					value: temp_c,
					content: { time, conditionText: condition.text }
				});
			});
			series.push(singleDateData);
		});
		return series;
	};
	const getOption = (forecastday, mode) => {
		const modeColor = (lightColor = 'rgba(255, 255,255, 1)') =>
			mode ? lightColor : DarkColor.mainColor;

		const modeTooltipColor = (lightColor = 'rgba(255, 255,255, 1)') =>
			mode ? DarkColor.backgroundColor : lightColor;
		return {
			legend: {
				type: 'scroll',
				itemWidth: 35,
				itemHeight: 35,
				data: calLegends(forecastday),
				textStyle: {
					color: modeColor()
				},
				pageTextStyle: {
					color: modeColor()
				}
			},
			xAxis: {
				type: 'category',
				data: [...Array(24).keys()].map((i) => i + ':00'),
				boundaryGap: false,
				name: t('chart.Hour')
			},
			yAxis: {
				type: 'value',
				name: '℃',
				min: calGreatest(forecastday, 'min') - 1,
				max: calGreatest(forecastday, 'max') + 1
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				},
				borderColor: modeTooltipColor(),
				backgroundColor: modeTooltipColor(),
				formatter(params) {
					// console.log(params);
					let str = '';
					params.forEach((param) => {
						str += `<div style='color: ${param?.color}'>${param?.data?.content?.time} - ${param?.value}℃ <br/>
						${param?.data?.content?.conditionText}</div>
						<hr/>`;
					});
					return str;
				}
			},
			dataZoom: [{}],
			series: calData(forecastday)
		};
	};
	return (
		<ReactECharts
			option={getOption(forecastday, darkMode)}
			notMerge={true}
			lazyUpdate={true}
		/>
	);
};

export default MultipleDateStackLineCahrt;
