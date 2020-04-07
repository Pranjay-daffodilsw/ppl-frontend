import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import { watchRefreshPost } from "../sagas/saga";
import rootReducer from './rootReducer';

export const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(watchRefreshPost);

export default store;