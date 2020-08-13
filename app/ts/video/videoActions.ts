import { AnyAction } from "redux";
import {ActionTypePrefix} from "../common/constants/ActionTypePrefix";
import Video from "./Video";

const PREFIX: string = ActionTypePrefix.VIDEO_LIST;

export const VideoListActionType= {
    SET_VIDEO_LIST: `${PREFIX}_SET_VIDEO_LIST`,
    FETCH_LIST:`${PREFIX}_FETCH_LIST`,
    SET_IS_FETCHING: `${PREFIX}_SET_IS_FETCHING`,
    CANCEL_FETCH_LIST: `${PREFIX}_CANCEL_FETCH_LIST`,
};

export const fetchVideoListAction = (): AnyAction => {
    return {
        type: VideoListActionType.FETCH_LIST,
    };
};

export const setVideoListAction = (videos: Video[]): AnyAction => {
    return {
        type: VideoListActionType.SET_VIDEO_LIST,
        videos
    };
};

export const setIsFetchingVideoListAction = (isFetching: boolean): AnyAction => {
    return {
        type: VideoListActionType.SET_IS_FETCHING,
        isFetching: isFetching,
    };
};

export const cancelFetchVideoListAction = (): AnyAction => {
    return {
        type: VideoListActionType.CANCEL_FETCH_LIST,
    };
};