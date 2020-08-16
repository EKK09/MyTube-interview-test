import {call, cancel, fork, put, take, takeLatest} from "redux-saga/effects";
import Pagination from "../pagination/Pagination";
import {
    FavoriteListActionType,
    setFavoriteListPaginationAction,
    setFavoriteVideoListAction,
    setIsFetchingFavoriteListAction
} from "./favoriteListAction";
import {fetchFavoriteListApi} from "./favoriteApi";
import Video from "../video/Video";
import {DEFAULT_QUERY_PARAMETER} from "../common/constants/ApiConfig";
import {getFavoriteListByVideoListJson, VideoListJson} from "../common/jsons/VideoListJson";

export function* watchFavoriteListActions() {
    yield takeLatest(FavoriteListActionType.FETCH_LIST, watchFetchFavoriteList);
}

export function* watchFetchFavoriteList() {
    const task = yield fork(fetchFavoriteListWithLoading);
    yield take(FavoriteListActionType.CANCEL_FETCH_LIST);
    yield cancel(task);
}

export function* fetchFavoriteListWithLoading() {
    yield put(setIsFetchingFavoriteListAction(true));
    yield call(fetchFavoriteList);
    yield put(setIsFetchingFavoriteListAction(false));
}

export function* fetchFavoriteList() {
    try {
        // TODO: 最多 50 筆，目前先連發兩次取到最多100筆 不考慮錯誤處理
        const response: Response = yield call(fetchFavoriteListApi, DEFAULT_QUERY_PARAMETER);

        const videoListJson: VideoListJson= yield response.json();
        const videos: Video[] = getFavoriteListByVideoListJson(videoListJson.items);

        const pageToken: string = videoListJson.nextPageToken;

        if ( !pageToken ) {
            const pagination: Pagination = new Pagination();
            pagination.loadFromPageInfoJson({totalResults: videos.length, resultsPerPage: 12});
            yield put(setFavoriteListPaginationAction(pagination));
            yield put(setFavoriteVideoListAction(videos));
            return;
        }

        const response2: Response = yield call(fetchFavoriteListApi, {...DEFAULT_QUERY_PARAMETER, pageToken});
        const videoListJson2: VideoListJson= yield response2.json();
        const videos2: Video[] = getFavoriteListByVideoListJson(videoListJson2.items);
        const completeVideos: Video[] = videos.concat(videos2);

        const pagination: Pagination = new Pagination();
        pagination.loadFromPageInfoJson({totalResults: completeVideos.length, resultsPerPage: 12});

        yield put(setFavoriteListPaginationAction(pagination));
        yield put(setFavoriteVideoListAction(completeVideos));
    } catch (error) {
        // TODO: 錯誤處理
    }
}