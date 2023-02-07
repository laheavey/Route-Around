import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'mapbox-gl/dist/mapbox-gl.css';

import store from './redux/store';
import App from './components/App/App';

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>,
  document.getElementById('react-root'),
);
