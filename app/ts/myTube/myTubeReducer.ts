import {combineReducers, Reducer} from "redux";
import videoListReducer, {VideoListState} from "../video/videoListReducer";
import favoriteListReducer, {FavoriteListState} from "../favorite/favoriteListReducer";
import videoDialogReducer, {VideoDialogState} from "../videoDialog/videoDialogReducer";
import popularVideoReducer, {PopularVideoState} from "../popular/popularVideoReducer";

export interface MyTubeState {
    videoListState: VideoListState;
    favoriteListState: FavoriteListState;
    videoDialogState: VideoDialogState;
    popularVideoState: PopularVideoState;
}

const myTubeReducer: Reducer<MyTubeState> = combineReducers<MyTubeState>({
    videoListState: videoListReducer,
    favoriteListState: favoriteListReducer,
    videoDialogState: videoDialogReducer,
    popularVideoState: popularVideoReducer,
});

export default myTubeReducer;
