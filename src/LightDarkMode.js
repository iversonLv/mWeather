// material component
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

// the hook
import { useTranslation } from 'react-i18next';

const LightDarkMode = ({ darkMode, setDarkMode }) => {
	const { t } = useTranslation();
	return (
		// FormControlLabel is used for click the label to switch
		<FormControlLabel
			control={
				<Switch
					checked={darkMode}
					onChange={(e) => setDarkMode(!darkMode)}
					color="primary"
					inputProps={{ 'aria-label': 'primary checkbox' }}
				/>
			}
			// label={`Switch to ${darkMode ? 'light' : 'dark'}`}
			label={darkMode ? t('switch.SwitchToLight') : t('switch.SwitchToDark')}
		/>
	);
};

export default LightDarkMode;
