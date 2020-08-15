import { AnyAction } from "redux";
import {ActionTypePrefix} from "../common/constants/ActionTypePrefix";
import Video from "./Video";
import Pagination from "../pagination/Pagination";

const PREFIX: string = ActionTypePrefix.VIDEO_LIST;

export const VideoListActionType= {
    SET_VIDEO_LIST: `${PREFIX}_SET_VIDEO_LIST`,
    FETCH_LIST:`${PREFIX}_FETCH_LIST`,
    SET_IS_FETCHING: `${PREFIX}_SET_IS_FETCHING`,
    CANCEL_FETCH_LIST: `${PREFIX}_CANCEL_FETCH_LIST`,
    SET_PAGINATION: `${PREFIX}_SET_PAGINATION`,
    LIKE_VIDEO: `${PREFIX}_LIKE_VIDEO`,
    UNLIKE_VIDEO: `${PREFIX}_UNLIKE_VIDEO`,
};

export const fetchVideoListAction = (): AnyAction => {
    return {
        type: VideoListActionType.FETCH_LIST,
    };
};

export const setVideoListAction = (videos: Video[]): AnyAction => {
    return {
        type: VideoListActionType.SET_VIDEO_LIST,
        videos
    };
};

export const setIsFetchingVideoListAction = (isFetching: boolean): AnyAction => {
    return {
        type: VideoListActionType.SET_IS_FETCHING,
        isFetching: isFetching,
    };
};

export const cancelFetchVideoListAction = (): AnyAction => {
    return {
        type: VideoListActionType.CANCEL_FETCH_LIST,
    };
};

export const setVideoListPaginationAction = (pagination: Pagination): AnyAction => {
    return {
        type: VideoListActionType.SET_PAGINATION,
        pagination,
    };
};

export const likeVideoFavoriteByIdAction= (id: string): AnyAction => {
    return {
        type: VideoListActionType.LIKE_VIDEO,
        id
    };
};

export const unlikeVideoFavoriteByIdAction= (id: string): AnyAction => {
    return {
        type: VideoListActionType.UNLIKE_VIDEO,
        id
    };
};
