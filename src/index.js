import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
/* import registerServiceWorker from './registerServiceWorker';*/
import configureStore, { history } from "./redux/store";
import { ConnectedRouter } from 'react-router-redux';
import { Routes, Route } from 'react-router-dom';
import { getUser } from "./redux/action/action";
const store = configureStore();

if (localStorage.Auth) {
  console.log("first dispatch");
  //console.log(localStorage.Auth)
  // update localstorage
  store.dispatch({ type: "SET_USER", user: JSON.parse(localStorage.Auth) });

  var _id = JSON.parse(localStorage.Auth)._id;
  getUser(_id).then((res) => {
    //console.log(JSON.parse(res))
    store.dispatch({ type: "SET_USER", user: res });
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
        <ConnectedRouter history={history}>
            <Routes>
                <Route path="/" element={App} />
            </Routes>
        </ConnectedRouter>
  </Provider>

  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
