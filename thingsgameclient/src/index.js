import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers/rootReducer';
import thunk from 'redux-thunk';

const appStore = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <BrowserRouter>
        <Provider store={appStore}>
            <App />
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));

serviceWorker.unregister();
