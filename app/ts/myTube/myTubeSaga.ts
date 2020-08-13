import { all } from "redux-saga/effects";
import { watchVideoActions } from "../video/videoSaga";

function* myTubeSaga() {
    yield all([
        watchVideoActions(),
    ]);
}

export default myTubeSaga;