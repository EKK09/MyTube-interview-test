import { AnyAction, Reducer } from "redux";
import { cloneDeep } from "lodash";
import Video from "./Video";
import { VideoListActionType } from "./videoListAction";

export interface VideoListState {
    videos: Video[];
}

export const DEFAULT_VIDEO_LIST_STATE: VideoListState = {
    videos: [],
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

        default:
            return state;
    }
};

export default videoListReducer;
