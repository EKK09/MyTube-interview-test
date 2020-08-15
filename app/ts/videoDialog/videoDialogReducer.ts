import {AnyAction, Reducer} from "redux";
import Video from "../video/Video";
import {VideoDialogActionTypes} from "./videoDialogActions";

export interface VideoDialogState {
    video: Video;
    isShow: boolean;
}

export const DEFAULT_VIDEO_DIALOG_STATE = {
    video: new Video(),
    isShow: false,
};

const videoDialogReducer: Reducer <VideoDialogState> = (
    state: VideoDialogState = DEFAULT_VIDEO_DIALOG_STATE,
    action: AnyAction,
): VideoDialogState => {
    switch (action.type) {
    case VideoDialogActionTypes.SHOW_DIALOG:
        return{
            ...state,
            isShow: true,
        };

    case VideoDialogActionTypes.HIDE_DIALOG:
        return{
            ...DEFAULT_VIDEO_DIALOG_STATE,
        };

    case VideoDialogActionTypes.SET_VIDEO:
        return {
            ...state,
            video: action.video,
        };

    default:
        return state;
    }
};

export default videoDialogReducer;
