import { registerRootComponent } from 'expo';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

const ReduxApp = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

registerRootComponent(ReduxApp);
