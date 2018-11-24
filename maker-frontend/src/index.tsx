import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';
import Root from './root';

ReactDOM.render(<Root />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
