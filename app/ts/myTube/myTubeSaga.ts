import {all} from "redux-saga/effects";
import {watchVideoActions} from "../video/videoSaga";
import {watchFavoriteListActions} from "../favorite/favoriteSaga";

function* myTubeSaga() {
    yield all([
        watchVideoActions(),
        watchFavoriteListActions(),
    ]);
}

export default myTubeSaga;