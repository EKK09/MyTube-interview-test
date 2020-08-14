import { AnyAction, Reducer } from "redux";
import { cloneDeep } from "lodash";
import Pagination from "../pagination/Pagination";
import { FavoriteListActionType } from "./favoriteListAction";
import SessionManager from "../common/tool/SessionManager";
import Video from "../video/Video";

export interface FavoriteListState {
    pagination: Pagination;
    videos: Video[];
}

const defaultPagination: Pagination = new Pagination();

export const DEFAULT_FAVORITE_LIST_STATE: FavoriteListState = {
    videos: [],
    pagination: defaultPagination
};

const favoriteListReducer: Reducer<FavoriteListState> = (
    state: FavoriteListState = DEFAULT_FAVORITE_LIST_STATE,
    action: AnyAction,
): FavoriteListState => {
    switch (action.type) {

        case FavoriteListActionType.SET_LIST:
            return {
                ...state,
                videos: cloneDeep(action.videos),
            };

        case FavoriteListActionType.ADD_FAVORITE_VIDEO_ID:
            SessionManager.addFavoriteVideoId(action.id);

            return {
                ...state,
            };

        case FavoriteListActionType.REMOVE_FAVORITE_VIDEO_ID:
            SessionManager.removeFavoriteVideoId(action.id);

            return {
                ...state,
            };

        case FavoriteListActionType.SET_PAGINATION:
            return {
                ...state,
                pagination: cloneDeep(action.pagination),
            };

        default:
            return state;
    }
};

export default favoriteListReducer;
