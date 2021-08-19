import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import React from 'react';
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider
} from '@material-ui/pickers';

import Button from '@material-ui/core/Button';

// the hook
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between'
	}
}));

const DateRange = ({
	selectedFromDate,
	setSelectedFromDate,
	selectedToDate,
	setSelectedToDate,
	currentDate
}) => {
	const { t } = useTranslation();
	const classes = useStyles();
	const limitDaysAgo = (days) => {
		const today = new Date();
		return today.setDate(today.getDate() - days);
	};
	const limitDaysAfter = (days) => {
		const today = new Date();
		return today.setDate(today.getDate() + days);
	};
	const handleToday = () => {
		setSelectedFromDate(currentDate);
		setSelectedToDate(currentDate);
	};

	return (
		<div className={classes.root}>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardDatePicker
					format="yyyy-MM-dd"
					label={t('search.From')}
					autoOk
					variant="inline"
					value={selectedFromDate}
					onChange={(date) => {
						setSelectedFromDate(
							`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
						);
					}}
					maxDate={selectedToDate}
					minDate={limitDaysAgo(7)}
				/>

				<KeyboardDatePicker
					format="yyyy-MM-dd"
					label={t('search.To')}
					autoOk
					variant="inline"
					value={selectedToDate}
					onChange={(date) => {
						setSelectedToDate(
							`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
						);
					}}
					minDate={limitDaysAgo(7)}
					maxDate={limitDaysAfter(2)}
				/>
			</MuiPickersUtilsProvider>
			<Button size="small" onClick={handleToday}>
				{t('search.Today')}
			</Button>
		</div>
	);
};

export default DateRange;
