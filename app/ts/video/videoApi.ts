import HttpMethod from "../common/constants/HttpMethod";
import { AnyAction } from "redux";
import {QueryParameter} from "../common/constants/ApiConfig";

export enum VideoApiPaths {
    FETCH_VIDEO_LIST_URL = "https://www.googleapis.com/youtube/v3/videos",
}

export const getFetchVideoListUrl = (queryParameter: QueryParameter): string => {
    let url: string = "";
    url += VideoApiPaths.FETCH_VIDEO_LIST_URL;
    url += `?part=${queryParameter.part}`;
    url += `&chart=${queryParameter.chart}`;
    url += `&videoCategoryId=${queryParameter.videoCategoryId}`;
    url += `&key=${queryParameter.key}`;
    url += `&maxResults=${queryParameter.maxResults}`;
    url += `&pageToken=${queryParameter.pageToken}`;

    return url;
};

export const fetchVideoListApi = async (queryParameter: QueryParameter): Promise<AnyAction> => {
    return await fetch(
        getFetchVideoListUrl(queryParameter),
        {
            method: HttpMethod.GET,
            headers: {
                "Content-Type": "application/jsons",
            },
        },
    );
};