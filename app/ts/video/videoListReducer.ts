import { AnyAction, Reducer } from "redux";
import { cloneDeep } from "lodash";
import Video from "./Video";
import { VideoListActionType } from "./videoListAction";

export interface VideoListState {
    videos: Video[];
    isFetching: boolean;
}

export const DEFAULT_VIDEO_LIST_STATE: VideoListState = {
    videos: [],
    isFetching: false,
};

const videoListReducer: Reducer<VideoListState> = (
    state: VideoListState = DEFAULT_VIDEO_LIST_STATE,
    action: AnyAction,
): VideoListState => {
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

        default:
            return state;
    }
};

export default videoListReducer;
