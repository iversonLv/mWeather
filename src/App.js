import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

// the hook
import { useTranslation } from 'react-i18next';

// For dark mode
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

// components
import DateRange from './DateRange';
import InfoToolTip from './InfoToolTip';
import Header from './Header';
import Loading from './Loading';
import SingleDayLineChart from './SingleDayLineChart';
import MultipleDateStackLineChart from './MultipleDateStackLineChart';
import LanguageToggle from './LanguageToggle';

// mode switch component
import LightDarkMode from './LightDarkMode';

// Dark theme color
import { DarkColor } from './color';

const useStyles = makeStyles((theme) => ({
	topBar: {
		display: 'flex',
		paddingTop: 15,
		justifyContent: 'space-between'
	},
	root: {
		minHeight: '100vh',
		maxWidth: '100%',
		width: '100vw',
		paddingBottom: 50
	},
	rootDark: {
		backgroundColor: DarkColor.backgroundColor,
		color: 'rgb(255 255 255)'
	},
	rootLight: {
		backgroundColor: 'rgb(255 255 255)',
		color: DarkColor.backgroundColor
	},
	paper: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		padding: '5px 10px',
		maxWidth: 600,
		margin: '0 auto 15px'
	},
	search: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		paddingBottom: 15
	},
	input: {
		flex: 1
	},
	divider: {
		height: 28,
		margin: 4
	}
}));

const App = () => {
	const classes = useStyles();

	// the hook
	const { t } = useTranslation();
	// language state
	const [language, setLanguage] = useState('en');

	// dark light mode state
	const [darkMode, setDarkMode] = useState(false);

	const theme = createTheme({
		palette: {
			type: darkMode ? 'dark' : 'light',
			primary: {
				light: '#757ce8',
				main: darkMode ? DarkColor.mainColor : '#3f50b5',
				dark: DarkColor.backgroundColor,
				contrastText: '#fff'
			},
			secondary: {
				light: '#ff7961',
				main: '#f44336',
				dark: DarkColor.mainColor,
				contrastText: '#000'
			}
		}
	});

	// We need the date format strictly as 'yyyy-MM-dd' so for tricky
	const currentDateYear = new Date().getFullYear();
	const currentDateMonth = new Date().getMonth() + 1;
	const currentDateDate = new Date().getDate();
	const currentDate = `${currentDateYear}-${currentDateMonth}-${currentDateDate}`;

	// Date from-to
	const [selectedFromDate, setSelectedFromDate] = useState(currentDate);
	const [selectedToDate, setSelectedToDate] = useState(currentDate);

	const [isLoading, setIsLoading] = useState(true);
	const [place, setPlace] = useState('Guangzhou');
	const [weatherData, setWeatherData] = useState('');

	// Call Api
	const getWeatherData = async (q, dt, end_dt, lang) => {
		try {
			setIsLoading(true);
			const response = await axios.get(
				'https://weatherapi-com.p.rapidapi.com/history.json',
				{
					params: {
						q,
						dt,
						lang,
						end_dt
					},
					headers: {
						'x-rapidapi-key':
							'f46521d9damsh8324844f27ff91bp1eb0b5jsn7ad1efaa0b97',
						'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
					}
				}
			);
			if (response.data) {
				setWeatherData(response.data);
				setIsLoading(false);
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	// Default get local weather by default
	useEffect(() => {
		getWeatherData(place, selectedFromDate, selectedToDate, language);
	}, [place, selectedFromDate, selectedToDate, language]);

	return (
		<ThemeProvider theme={theme}>
			<Container
				className={`
					${classes.root}
					${darkMode ? classes.rootDark : classes.rootLight}
				`}
			>
				<div className={classes.topBar}>
					<LightDarkMode darkMode={darkMode} setDarkMode={setDarkMode} />
					<LanguageToggle language={language} setLanguage={setLanguage} />
				</div>
				<Header
					darkMode={darkMode}
					weatherData={weatherData}
					isLoading={isLoading}
				/>
				{/* input for place */}
				<Paper className={classes.paper}>
					<div className={classes.search}>
						<TextField
							className={classes.input}
							id="standard-basic"
							label={t('search.PleaseInputThePlace')}
							value={place}
							onChange={(e) => setPlace(e.target.value)}
						/>
						<Divider className={classes.divider} orientation="vertical" />
						{/* input info */}
						<InfoToolTip darkMode={darkMode} />
					</div>

					<DateRange
						currentDate={currentDate}
						selectedFromDate={selectedFromDate}
						setSelectedFromDate={setSelectedFromDate}
						selectedToDate={selectedToDate}
						setSelectedToDate={setSelectedToDate}
					/>
				</Paper>

				{/* Chart for weather */}

				{weatherData &&
					!isLoading &&
					weatherData?.forecast?.forecastday.map((day, index) => {
						return (
							<SingleDayLineChart darkMode={darkMode} key={index} day={day} />
						);
					})}
				{/* Loding */}
				{isLoading && <Loading />}

				{weatherData?.forecast?.forecastday.length > 1 && !isLoading && (
					<MultipleDateStackLineChart
						darkMode={darkMode}
						forecastday={weatherData?.forecast?.forecastday}
					/>
				)}
			</Container>
		</ThemeProvider>
	);
};
export default App;
