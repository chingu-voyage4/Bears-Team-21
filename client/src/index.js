import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:4444');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
