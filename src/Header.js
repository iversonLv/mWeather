import { makeStyles } from '@material-ui/core/styles';

import CloudOutlinedIcon from '@material-ui/icons/CloudOutlined';

// dark theme color
import { DarkColor } from './color';

const useStyles = makeStyles((theme) => ({
	logo: {
		fontSize: 40
	},
	title: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	subTitle: {
		fontSize: '12px',
		fontWeight: 300,
		width: '50%',
		marginTop: '10px',
		textAlign: 'center',
		justifyContent: 'center',
		borderBottom: `1px solid ${DarkColor.backgroundColor}`,
		lineHeight: '0.1em'
	},
	darkSubTitle: {
		borderBottom: '1px solid white'
	},
	subTitleSpan: {
		padding: '0 10px',
		background: '#fff'
	},
	darkSubTitleSpan: {
		background: DarkColor.backgroundColor
	}
}));

const Header = ({ weatherData, isLoading, darkMode }) => {
	const classes = useStyles();

	return (
		<h1 className={classes.title}>
			<CloudOutlinedIcon className={classes.logo} />
			mWeather
			<span
				className={`${classes.subTitle} ${
					darkMode ? classes.darkSubTitle : ''
				}`}
			>
				<span
					className={`${classes.subTitleSpan} ${
						darkMode ? classes.darkSubTitleSpan : ''
					}`}
				>
					{weatherData &&
						!isLoading &&
						`${weatherData?.location?.name}, ${weatherData?.location?.country}`}
				</span>
			</span>
		</h1>
	);
};

export default Header;
