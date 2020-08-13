import { applyMiddleware, createStore } from "redux";
import myTubeReducer from "./myTubeReducer";

import createSagaMiddleware from "redux-saga";
import myTubeSaga from "./myTubeSaga";


const sagaMiddleware = createSagaMiddleware();


const myTubeStore = createStore(
    myTubeReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(myTubeSaga);

export default myTubeStore;
