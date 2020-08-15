import {ActionTypePrefix} from "../common/constants/ActionTypePrefix";
import Video from "../video/Video";
import {AnyAction} from "redux";


const PREFIX: string = ActionTypePrefix.VIDEO_DIALOG;

export const VideoDialogActionTypes = {
    SHOW_DIALOG: `${PREFIX}_SHOW_DIALOG`,
    HIDE_DIALOG: `${PREFIX}_HIDE_DIALOG`,
    SET_VIDEO: `${PREFIX}_SET_VIDEO`,
};

export const showVideoDialogAction = (): AnyAction => {
    return {
        type: VideoDialogActionTypes.SHOW_DIALOG,
    };
};

export const hideVideoDialogAction = (): AnyAction => {
    return {
        type: VideoDialogActionTypes.HIDE_DIALOG,
    };
};


export const setDialogVideoAction = (video: Video): AnyAction => {
    return {
        type: VideoDialogActionTypes.SET_VIDEO,
        video,
    };
};