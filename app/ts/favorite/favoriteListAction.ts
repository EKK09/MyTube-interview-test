import { AnyAction } from "redux";
import {ActionTypePrefix} from "../common/constants/ActionTypePrefix";
import Video from "../video/Video";
import Pagination from "../pagination/Pagination";
const PREFIX: string = ActionTypePrefix.VIDEO_LIST;

export const FavoriteListActionType= {
    SET_LIST: `${PREFIX}_SET_LIST`,
    FETCH_LIST: `${PREFIX}_FETCH_LIST`,
    ADD_FAVORITE_VIDEO_ID:`${PREFIX}_ADD_FAVORITE_VIDEO_ID`,
    REMOVE_FAVORITE_VIDEO_ID:`${PREFIX}_REMOVE_FAVORITE_VIDEO_ID`,
    SET_PAGINATION: `${PREFIX}_SET_PAGINATION`,
    CANCEL_FETCH_LIST: `${PREFIX}_CANCEL_FETCH_LIST`,
};

export const fetchFavoriteListAction = (): AnyAction => {
    return {
        type: FavoriteListActionType.FETCH_LIST,
    };
};

export const setFavoriteVideoListAction = (videos: Video[]): AnyAction => {
    return {
        type: FavoriteListActionType.SET_LIST,
        videos
    };
};


export const addFavoriteVideoIdAction = (id: string): AnyAction => {
    return {
        type: FavoriteListActionType.ADD_FAVORITE_VIDEO_ID,
        id
    };
};

export const removeFavoriteVideoIdAction = (id: string): AnyAction => {
    return {
        type: FavoriteListActionType.REMOVE_FAVORITE_VIDEO_ID,
        id,
    };
};

export const cancelFetchFavoriteListAction = (): AnyAction => {
    return {
        type: FavoriteListActionType.CANCEL_FETCH_LIST,
    };
};

export const setFavoriteListPaginationAction = (pagination: Pagination): AnyAction => {
    return {
        type: FavoriteListActionType.SET_PAGINATION,
        pagination,
    };
};
