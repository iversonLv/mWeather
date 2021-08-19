import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom';
import LinearProgress from '@material-ui/core/LinearProgress';

import App from './App';

// i18n
import './i18n';

const rootElement = document.getElementById('root');
ReactDOM.render(
	<StrictMode>
		<Suspense fallback={<LinearProgress />}>
			<App />
		</Suspense>
	</StrictMode>,
	rootElement
);
