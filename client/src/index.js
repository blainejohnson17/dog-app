import './polyfills';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App/App.component';
import Services from './Services';
import { createAppStore } from './store';
import './custom.scss';

/**
 * 
 * 
 *
 * 
 */
function main() {
  const store = createAppStore();

  // Services.setBaseUrls({
  //   serviceBaseUrl: ''
  // });


  ReactDOM.render((
    <Provider store={store}>
      <App />
    </Provider>
  ), document.getElementById('app-container'));

}

main();
