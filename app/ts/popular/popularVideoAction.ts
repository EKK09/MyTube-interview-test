import { AnyAction } from "redux";
import {ActionTypePrefix} from "../common/constants/ActionTypePrefix";
import Video from "../video/Video";

const PREFIX: string = ActionTypePrefix.POPULAR_VIDEO;

export const PopularActionType = {
    SET_VIDEO: `${PREFIX}_SET_VIDEO`,
};

export const setPopularVideoAction = (video: Video): AnyAction => {
    return {
        type: PopularActionType.SET_VIDEO,
        video
    };
};

