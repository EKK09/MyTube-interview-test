import { Reducer, combineReducers } from "redux";
import videoListReducer, {VideoListState} from "../video/videoListReducer";

export interface MyTubeState {
    videoListState: VideoListState;
}

const myTubeReducer: Reducer<MyTubeState> = combineReducers<MyTubeState>({
    videoListState: videoListReducer,
});

export default myTubeReducer;
