import { persistStore } from 'redux-persist';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import createSagaMiddleaware from 'redux-saga';

import persistedReducer from './modules/reduxPersist';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMiddleare = createSagaMiddleaware();

const store = createStore(
  persistedReducer(rootReducer),
  applyMiddleware(sagaMiddleare)
);

sagaMiddleare.run(rootSaga);

export const persistor = persistStore(store);
export default store;
