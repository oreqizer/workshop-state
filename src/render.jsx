import React from 'react';
import ReactDOM from 'react-dom';
import './render.css';
import Root from './scenes/Root';
import registerServiceWorker from './browser/registerServiceWorker';

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
