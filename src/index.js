import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './components/App';
import Amplify, { Auth } from 'aws-amplify';
import config from './congif.json';

Amplify.configure({
  Auth : {
    mandatorySignId : true,
    region : config.cognito.REGION,
    userPoolId : config.cognito.USER_POOL_ID,
    userPoolWebClientId : config.cognito.APP_CLIENT_ID
  }
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


