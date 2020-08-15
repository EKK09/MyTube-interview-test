import { AnyAction, Reducer } from "redux";
import { cloneDeep } from "lodash";
import Video from "./Video";
import { VideoListActionType } from "./videoListAction";
import Pagination from "../pagination/Pagination";

export interface VideoListState {
    videos: Video[];
    isFetching: boolean;
    pagination: Pagination;
}

const defaultPagination: Pagination = new Pagination();

export const DEFAULT_VIDEO_LIST_STATE: VideoListState = {
    videos: [],
    isFetching: false,
    pagination: defaultPagination
};

const videoListReducer: Reducer<VideoListState> = (
    state: VideoListState = DEFAULT_VIDEO_LIST_STATE,
    action: AnyAction,
): VideoListState => {
    let videos: Video[];

    switch (action.type) {
        case VideoListActionType.SET_VIDEO_LIST:
            return {
                ...state,
                videos: cloneDeep(action.videos),
            };

        case VideoListActionType.SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            };

        case VideoListActionType.SET_PAGINATION:
            return {
                ...state,
                pagination: cloneDeep(action.pagination),
            };

        case VideoListActionType.LIKE_VIDEO:
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

        case VideoListActionType.UNLIKE_VIDEO:
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

export default videoListReducer;
