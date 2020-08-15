import HttpMethod from "../common/constants/HttpMethod";
import { AnyAction } from "redux";

export enum VideoApiPaths {
    FETCH_VIDEO_LIST_URL = "https://www.googleapis.com/youtube/v3/videos",
}

export const getFetchVideoListUrl = (): string => {
    let url: string = "";
    url += VideoApiPaths.FETCH_VIDEO_LIST_URL;
    // TODO: 提出參數
    return url + "?part=id, snippet,contentDetails&chart=mostPopular&key=AIzaSyBVt3SPSyBXBAa9pCQ4McLKAxPsABnCVJk&maxResults=100";
};

export const fetchVideoListApi = async (): Promise<AnyAction> => {
    return await fetch(
        getFetchVideoListUrl(),
        {
            method: HttpMethod.GET,
            headers: {
                "Content-Type": "application/jsons",
            },
        },
    );
};