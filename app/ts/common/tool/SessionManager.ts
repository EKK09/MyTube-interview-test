class SessionManager {
    public static FAVORITE_ID_LIST: string = 'FAVORITE_ID_LIST';

    static getFavoriteVideoIdList(): string[] {
        try {
            const favoriteVideoIdsJson: string | null = localStorage.getItem(SessionManager.FAVORITE_ID_LIST);
            if (favoriteVideoIdsJson === null) {
                return [];

            }
            const favoriteVideoIds: string[] = JSON.parse(favoriteVideoIdsJson);
            return  favoriteVideoIds
        } catch (e) {
            return [];
        }

    }

    static setFavoriteVideoIdList(ids: string[]): void {
        try {
            const favoriteVideoIdsJson: string = JSON.stringify(ids);
            localStorage.setItem(SessionManager.FAVORITE_ID_LIST, favoriteVideoIdsJson);
        } catch (e) {
            return;
        }
    }

    static addFavoriteVideoId(id: string): void {
        try {
            const favoriteVideoIds: string[] = SessionManager.getFavoriteVideoIdList();
            favoriteVideoIds.push(id);
            SessionManager.setFavoriteVideoIdList(favoriteVideoIds);
        } catch (e) {
            return;
        }
    }

    static removeFavoriteVideoId(id: string): void {
        try {
            const favoriteVideoIds: string[] = SessionManager.getFavoriteVideoIdList();
            const targetIdIndex: number = favoriteVideoIds.indexOf(id);

            if (targetIdIndex < 0) {
                return;
            }

            favoriteVideoIds.splice(targetIdIndex, 1);
            SessionManager.setFavoriteVideoIdList(favoriteVideoIds);
        } catch (e) {
            return;
        }
    }
}

export default SessionManager;