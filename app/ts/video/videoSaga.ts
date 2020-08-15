import {
    setIsFetchingVideoListAction,
    setVideoListAction,
    setVideoListPaginationAction,
    VideoListActionType
} from "./videoListAction";
import { call, put, takeLatest, fork, take, cancel } from "redux-saga/effects";
import { fetchVideoListApi } from "./videoApi";
import { getVideosByVideoListJson, VideoListJson } from "../common/jsons/VideoListJson";
import Video from "./Video";
import Pagination from "../pagination/Pagination";
import SessionManager from "../common/tool/SessionManager";
import {DEFAULT_QUERY_PARAMETER} from "../common/constants/ApiConfig";


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
        // TODO: 最多 50 筆，目前先連發兩次取到 100筆 不考慮錯誤處理
        const response: Response = yield call(fetchVideoListApi, DEFAULT_QUERY_PARAMETER);

        const videoListJson: VideoListJson= yield response.json();
        const videos: Video[] = getVideosByVideoListJson(videoListJson.items);

        const pageToken: string = videoListJson.nextPageToken;
        const response2: Response = yield call(fetchVideoListApi, {...DEFAULT_QUERY_PARAMETER, pageToken});
        const videoListJson2: VideoListJson= yield response2.json();
        const videos2: Video[] = getVideosByVideoListJson(videoListJson2.items);

        const completeVideos: Video[] = videos.concat(videos2);
        const favoriteVideoIds: string[] = SessionManager.getFavoriteVideoIdList();

        for (const video of completeVideos) {
            if (favoriteVideoIds.indexOf(video.id) !== -1) {
                video.favorite = true;
            }
        }

        const pagination: Pagination = new Pagination();
        pagination.loadFromPageInfoJson({totalResults: completeVideos.length, resultsPerPage: 12});

        yield put(setVideoListPaginationAction(pagination));
        yield put(setVideoListAction(completeVideos));
    } catch (error) {
        // TODO: 錯誤處理
    }
}
