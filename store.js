import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
// import devTools from 'remote-redux-devtools';
import { thunk } from 'redux-thunk';

import rootReducer from './src/reducers';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export let store = createStore(persistedReducer, applyMiddleware(thunk));
export let persistor = persistStore(store);
