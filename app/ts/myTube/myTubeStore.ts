import { createStore } from "redux";
import myTubeReducer from "./myTubeReducer";

const myTubeStore = createStore(
    myTubeReducer,
);

export default myTubeStore;
