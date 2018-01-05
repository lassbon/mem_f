import React from 'react';
import { render } from 'react-dom';

import 'semantic-ui-css/semantic.min.css';

import './index.css';
import './normalize.css'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

render(<App />, document.getElementById('root'));
registerServiceWorker();
