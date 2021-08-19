import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { useTranslation } from 'react-i18next';
const LanguageToggle = ({ language, setLanguage }) => {
	const { i18n } = useTranslation();
	const handleSetLanguage = (event, newLanguage) => {
		if (newLanguage !== null) {
			setLanguage(newLanguage);
			i18n.changeLanguage(newLanguage);
		}
	};
	return (
		<ToggleButtonGroup
			value={language}
			exclusive
			onChange={handleSetLanguage}
			aria-label="text alignment"
			size="small"
		>
			<ToggleButton value="en" aria-label="left aligned" fontSize="small">
				EN
			</ToggleButton>
			<ToggleButton value="zh" aria-label="right aligned" fontSize="small">
				中文
			</ToggleButton>
		</ToggleButtonGroup>
	);
};

export default LanguageToggle;
