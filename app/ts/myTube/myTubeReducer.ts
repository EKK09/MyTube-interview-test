import { Reducer, combineReducers } from "redux";
import videoListReducer, {VideoListState} from "../video/videoListReducer";
import favoriteListReducer, {FavoriteListState} from "../favorite/favoriteListReducer";

export interface MyTubeState {
    videoListState: VideoListState;
    favoriteListState: FavoriteListState;
}

const myTubeReducer: Reducer<MyTubeState> = combineReducers<MyTubeState>({
    videoListState: videoListReducer,
    favoriteListState: favoriteListReducer,
});

export default myTubeReducer;
