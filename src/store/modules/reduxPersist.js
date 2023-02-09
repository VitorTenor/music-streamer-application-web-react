// Salva no Local Storage
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      // nome da aplicação
      key: 'CONSUMO-API',
      storage,
      // define o modulo a ser salvo
      whitelist: ['auth'],
    },
    reducers
  );
  return persistedReducer;
};
