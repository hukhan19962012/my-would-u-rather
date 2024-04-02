import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './components/App.jsx';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import reducer from './reducers'
import middleware from './middleware'
import reportWebVitals from './reportWebVitals.js';
import { createStore } from 'redux';


export const store = createStore(reducer, middleware)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <Router>
    <App />
  </Router>
</Provider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
