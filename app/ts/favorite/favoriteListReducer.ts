import { AnyAction, Reducer } from "redux";
import { cloneDeep } from "lodash";
import Pagination from "../pagination/Pagination";
import { FavoriteListActionType } from "./favoriteListAction";
import SessionManager from "../common/tool/SessionManager";
import Video from "../video/Video";

export interface FavoriteListState {
    pagination: Pagination;
    isFetching: boolean;
    videos: Video[];
}

const defaultPagination: Pagination = new Pagination();

export const DEFAULT_FAVORITE_LIST_STATE: FavoriteListState = {
    videos: [],
    isFetching: false,
    pagination: defaultPagination
};

const favoriteListReducer: Reducer<FavoriteListState> = (
    state: FavoriteListState = DEFAULT_FAVORITE_LIST_STATE,
    action: AnyAction,
): FavoriteListState => {
    let videos: Video[];

    switch (action.type) {

        case FavoriteListActionType.SET_LIST:
            return {
                ...state,
                videos: cloneDeep(action.videos),
            };

        case FavoriteListActionType.SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            };

        case FavoriteListActionType.ADD_FAVORITE_VIDEO_ID:
            SessionManager.addFavoriteVideoId(action.id);
            return state;

        case FavoriteListActionType.REMOVE_FAVORITE_VIDEO_ID:
            SessionManager.removeFavoriteVideoId(action.id);
            return state;

        case FavoriteListActionType.SET_PAGINATION:
            return {
                ...state,
                pagination: cloneDeep(action.pagination),
            };

        case FavoriteListActionType.LIKE_VIDEO:
            videos = [];

            for (const video of state.videos) {
                if (video.id === action.id) {
                    video.favorite = true;
                }
                videos.push(video);
            }

            return {
                ...state,
                videos: videos,
            };

        case FavoriteListActionType.UNLIKE_VIDEO:
            videos = [];

            for (const video of state.videos) {
                if (video.id === action.id) {
                    video.favorite = false;
                }
                videos.push(video);
            }

            return {
                ...state,
                videos: videos,
            };

        default:
            return state;
    }
};

export default favoriteListReducer;
