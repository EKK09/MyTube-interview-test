import SessionManager from "../common/tool/SessionManager";

export const fetchFavoriteVideoIdListApi = async (): Promise<string[]> => {

    return SessionManager.getFavoriteVideoIdList();
};