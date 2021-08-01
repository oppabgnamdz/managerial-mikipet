import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import axios from 'axios';
import { urlAdmin } from './constant';

// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const { config: oldRequest } = error.response;
//     const response = await axios.post(urlAdmin, {
//       account: 'admin',
//       password: 'miki',
//     });
//     localStorage.setItem('token', response.data);
//     oldRequest.headers['Authorization'] = 'Bearer ' + response.data;
//     console.log(response.data);
//     const newData = await axios.request(oldRequest);
//     return newData;
//   }
// );

const store = createStore(reducers);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
