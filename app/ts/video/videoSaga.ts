import { setIsFetchingVideoListAction, setVideoListAction, VideoListActionType } from "./videoListAction";
import { call, put, takeLatest, fork, take, cancel } from "redux-saga/effects";
import { fetchVideoListApi } from "./videoApi";
import { getVideosByVideoListJson, VideoListJson } from "../common/jsons/VideoListJson";
import Video from "./Video";


export function* watchVideoActions() {
    yield takeLatest(VideoListActionType.FETCH_LIST, watchFetchVideoList);
}

export function* watchFetchVideoList() {
    const task = yield fork(fetchVideoListWithLoading);
    yield take(VideoListActionType.CANCEL_FETCH_LIST);
    yield cancel(task);
}

export function* fetchVideoListWithLoading() {
    yield put(setIsFetchingVideoListAction(true));
    yield call(fetchVideoList);
    yield put(setIsFetchingVideoListAction(false));
}

export function* fetchVideoList() {
    try {
        const response: Response = yield call(fetchVideoListApi);

        if (! response.ok) {
            // TODO: 錯誤處理
        } else {
            const videoListJson: VideoListJson= yield response.json();
            // TODO: 處理分頁
            const videos: Video[] = getVideosByVideoListJson(videoListJson.items);

            yield put(setVideoListAction(videos));
        }
    } catch (error) {
        // TODO: 錯誤處理
    }
}