import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';

import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux'
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';  // 추가로 /index.js 안해줘도 알아서 처리

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  }>
    <App />
  </Provider>,
  document.getElementById('root')
);
//Provider로 감싸주면 redux랑 application이랑 연결을 시켜준다
//Provider안에 store를 넣어주고, store안에 reducer를 넣어줘야 한다

//store뒤에 2개 추가한거는 redux extension(redux devtools)인데 이것을 통해 redux를 좀 더 편하게 사용할 수 있다



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
