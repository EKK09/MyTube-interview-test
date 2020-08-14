import {call, cancel, fork, put, select, take, takeLatest} from "redux-saga/effects";
import Pagination from "../pagination/Pagination";
import {
    FavoriteListActionType,
    setFavoriteListPaginationAction,
    setFavoriteVideoListAction
} from "./favoriteListAction";
import {fetchFavoriteVideoIdListApi} from "./favoriteApi";
import {MyTubeState} from "../myTube/myTubeReducer";
import Video from "../video/Video";


export function* watchFavoriteListActions() {
    yield takeLatest(FavoriteListActionType.FETCH_LIST, watchFetchVideoList);
}

export function* watchFetchVideoList() {
    const task = yield fork(fetchFavoriteListWithLoading);
    yield take(FavoriteListActionType.CANCEL_FETCH_LIST);
    yield cancel(task);
}

export function* fetchFavoriteListWithLoading() {
    // TODO: 是否需要 loading
    yield call(fetchFavoriteList);
}

export const getVideoListFromState = (state: MyTubeState): {videos: Video[]} => ({
    videos: state.videoListState.videos,
});

export function* fetchFavoriteList() {
    const { videos } = yield select(getVideoListFromState);

    try {
        const favoriteVideoIds: string[] = yield call(fetchFavoriteVideoIdListApi);

        const favoriteList: Video[] = [];

        for (const video of videos) {
            if (favoriteVideoIds.indexOf(video.id) !== -1) {
                favoriteList.push(video);
            }
        }

        const pagination: Pagination = new Pagination();
        pagination.totalCount = favoriteList.length;
        pagination.totalPage = Math.ceil(pagination.totalCount/pagination.perPage);

        yield put(setFavoriteVideoListAction(favoriteList));
        yield put(setFavoriteListPaginationAction(pagination));
    } catch (error) {
        // TODO: 錯誤處理
    }
}