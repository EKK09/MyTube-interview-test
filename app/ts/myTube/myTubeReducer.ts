import {combineReducers, Reducer} from "redux";
import videoListReducer, {VideoListState} from "../video/videoListReducer";
import favoriteListReducer, {FavoriteListState} from "../favorite/favoriteListReducer";
import videoDialogReducer, {VideoDialogState} from "../videoDialog/videoDialogReducer";

export interface MyTubeState {
    videoListState: VideoListState;
    favoriteListState: FavoriteListState;
    videoDialogState: VideoDialogState;
}

const myTubeReducer: Reducer<MyTubeState> = combineReducers<MyTubeState>({
    videoListState: videoListReducer,
    favoriteListState: favoriteListReducer,
    videoDialogState: videoDialogReducer,
});

export default myTubeReducer;
