import { Fragment } from 'react';

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';

// the hook
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
	iconButton: {
		padding: 10
	},
	infoHighlighted: {
		fontWeight: 'bold'
	}
}));

const InfoToolTip = ({ darkMode }) => {
	const { t } = useTranslation();
	const classes = useStyles();
	const HtmlTooltip = withStyles((theme) => ({
		tooltip: {
			backgroundColor: darkMode ? theme.primary : '#f5f5f9',
			color: darkMode ? theme.primary : 'rgba(0, 0, 0, 0.87)',
			fontSize: theme.typography.pxToRem(12),
			border: `1px solid ${darkMode ? theme.primary : '#dadde9'}`
		}
	}))(Tooltip);
	return (
		<HtmlTooltip
			placement="left"
			title={
				<Fragment>
					<ul>
						<li>
							{t(
								'search.ForHistoryTheDateShouldNotBeLessThanEightDaysAgoAndTwodaysFutuerDueToAPILimit'
							)}
						</li>
						<li>
							{t(
								'search.ForHistoryTheEndDateShouldBeEqualToOrGreaterThanFromDate'
							)}
						</li>
						<li>
							{t('search.cityName')}
							<span className={classes.infoHighlighted}>
								{t('search.EG')}: q=Paris
							</span>
						</li>
						<li>
							{t('search.USZip')}
							<span className={classes.infoHighlighted}>
								{t('search.EG')}: q=10001
							</span>
						</li>
						<li>
							{t('search.UKPstcode')}
							<span className={classes.infoHighlighted}>
								{t('search.EG')}: q=SW1
							</span>
						</li>
						<li>
							{t('search.CanadaPostalCode')}
							<span className={classes.infoHighlighted}>
								{t('search.EG')} q=G2J
							</span>
						</li>
						<li>
							{t('search.metar')}
							<span className={classes.infoHighlighted}>
								{t('search.EG')}: q=metar:EGLL
							</span>
						</li>
						<li>
							{t('search.iata')}
							<span className={classes.infoHighlighted}>
								{t('search.EG')}: q=iata:DXB
							</span>
						</li>
						<li>
							{t('search.autoIPLookup')}
							<span className={classes.infoHighlighted}>
								{t('search.EG')}: q=auto:ip
							</span>
						</li>
						<li>
							{t('search.IPAddress')}
							<span className={classes.infoHighlighted}>
								{t('search.EG')}: q=100.0.0.1
							</span>
						</li>
					</ul>
				</Fragment>
			}
		>
			<IconButton
				type="submit"
				className={classes.iconButton}
				aria-label="info"
			>
				<InfoOutlinedIcon />
			</IconButton>
		</HtmlTooltip>
	);
};

export default InfoToolTip;
