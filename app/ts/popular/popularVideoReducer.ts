import {AnyAction, Reducer} from "redux";
import {cloneDeep} from "lodash";
import {PopularActionType} from "./popularVideoAction";
import Video from "../video/Video";

export interface PopularVideoState {
    video: Video;
}

export const DEFAULT_POPULAR_VIDEO_STATE: PopularVideoState = {
    video: new Video(),
};

const popularVideoReducer: Reducer<PopularVideoState> = (
    state: PopularVideoState = DEFAULT_POPULAR_VIDEO_STATE,
    action: AnyAction,
): PopularVideoState => {

    switch (action.type) {
        case PopularActionType.SET_VIDEO:
            return {
                ...state,
                video: cloneDeep(action.video),
            };

        default:
            return state;
    }
};

export default popularVideoReducer;
