import SessionManager from "../common/tool/SessionManager";
import {AnyAction} from "redux";
import {QueryParameter} from "../common/constants/ApiConfig";
import {VideoApiPaths} from "../video/videoApi";
import HttpMethod from "../common/constants/HttpMethod";

export const getFetchFavoriteListUrl = (queryParameter: QueryParameter): string => {
    let url: string = "";
    url += VideoApiPaths.FETCH_VIDEO_LIST_URL;
    url += `?part=${queryParameter.part}`;

    const favoriteVideoIds: string[] = SessionManager.getFavoriteVideoIdList();
    url += `&id=${favoriteVideoIds.join(',')}`;

    url += `&key=${queryParameter.key}`;
    url += `&maxResults=${queryParameter.maxResults}`;
    url += `&pageToken=${queryParameter.pageToken}`;

    return url;
};

export const fetchFavoriteListApi = async (queryParameter: QueryParameter): Promise<AnyAction> => {

    return await fetch(
        getFetchFavoriteListUrl(queryParameter),
        {
            method: HttpMethod.GET,
            headers: {
                "Content-Type": "application/jsons",
            },
        },
    );
};