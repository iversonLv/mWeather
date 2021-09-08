// echarts
import ReactECharts from 'echarts-for-react';
import { makeStyles } from '@material-ui/core/styles';
// dark theme color
import { DarkColor } from './color';

// i18n hook
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
	chartBox: {
		paddingBottom: 15
	}
}));

const SingleDayLineChart = ({ day, darkMode }) => {
	const { t } = useTranslation();
	const classes = useStyles();
	// calData
	const calData = (data) => {
		const arr = [];
		(data || []).forEach((h) => {
			const { temp_c, condition, time } = h;
			arr.push({
				value: temp_c,
				symbol: `image://${condition.icon}`,
				content: { time, conditionText: condition.text }
			});
		});
		return arr;
	};

	// Cal the highest and lowest temp then the yAxis could be more focus for the temp
	const calGreatest = (data, minOrMax) => {
		if (minOrMax === 'min') {
			return Math.min(...(data || []).map((h) => h.temp_c));
		} else {
			return Math.max(...(data || []).map((h) => h.temp_c));
		}
	};
	// echarts option function base on the return weather
	const getOption = (weather, mode) => {
		const modeColor = (lightColor = 'rgba(255, 255,255, 1)') =>
			mode ? lightColor : DarkColor.mainColor;
		const modeTooltipColor = (lightColor = 'rgba(255, 255,255, 1)') =>
			mode ? DarkColor.backgroundColor : lightColor;
		return {
			darkMode: true,
			title: {
				text: `${weather?.date}`,
				left: 'center',
				top: '0%',
				textStyle: {
					fontSize: 13,
					fontWeight: 300,
					color: modeColor()
				}
			},
			xAxis: {
				type: 'category',
				data: [...Array(24).keys()].map((i) => i + ':00'),
				boundaryGap: false,
				nameTextStyle: {
					color: modeColor()
				},
				axisLabel: {
					color: modeColor()
				},
				name: t('chart.Hour')
			},
			yAxis: {
				type: 'value',
				name: '℃',
				min: calGreatest(day?.hour, 'min') - 1,
				max: calGreatest(day?.hour, 'max') + 1,
				nameTextStyle: {
					color: modeColor()
				},
				axisLabel: {
					color: modeColor()
				}
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				},
				textStyle: {
					color: modeColor()
				},
				borderColor: modeTooltipColor(),
				backgroundColor: modeTooltipColor(),
				formatter(params) {
					//console.log(params[0])
					return `${params[0].data.content.time} - ${params[0].value}℃ <br/>
					${params[0].data.content.conditionText}`;
				}
			},
			dataZoom: [{}],
			series: [
				{
					data: calData(weather?.hour),
					animation: false,
					lineStyle: {
						color: modeColor()
					},
					markArea: {
						silent: true,
						itemStyle: {},
						label: {
							color: modeColor(),
							show: true,
							position: [0, -30]
						},
						data: [
							[
								{
									name: `${t('chart.DayFrom')} ${day?.astro?.sunrise} - ${
										day?.astro?.sunset
									}`,
									xAxis: +weather?.astro?.sunrise.slice(1, 2)
								},
								{
									xAxis: +day?.astro?.sunset.slice(1, 2) + 12
								}
							]
						]
					},
					type: 'line',
					smooth: true,
					symbolSize: 35,
					label: {
						color: modeColor(),
						show: true,
						fontSize: 12,
						fontWeight: 300,
						formatter: '{c} ℃'
					}
				}
			]
		};
	};
	return (
		<ReactECharts
			className={classes.charBox}
			option={getOption(day, darkMode)}
			notMerge={true}
			lazyUpdate={true}
		/>
	);
};

export default SingleDayLineChart;
