import { AnyAction } from "redux";
import {ActionTypePrefix} from "../common/constants/ActionTypePrefix";
import Video from "./Video";

const PREFIX: string = ActionTypePrefix.VIDEO_LIST;

export const VideoListActionType= {
    SET_VIDEO_LIST: `${PREFIX}_SET_VIDEO_LIST`,
};

export const setVideoListAction = (videos: Video[]): AnyAction => {
    return {
        type: VideoListActionType.SET_VIDEO_LIST,
        videos
    };
};
