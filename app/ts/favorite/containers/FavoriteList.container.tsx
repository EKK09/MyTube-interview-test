import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {MyTubeState} from "../../myTube/myTubeReducer";
import Video from "../../video/Video";
import {cancelFetchFavoriteListAction, fetchFavoriteListAction} from "../favoriteListAction";
import VideoList from "../../video/components/VideoList.component";

interface FavoriteListContainerProps extends FavoriteListStateProps{
    dispatch: Dispatch;
}

interface FavoriteListStateProps {
    videos: Video[];
    isFetching: boolean;
}

const mapStateToProps = (state: MyTubeState): FavoriteListStateProps => ({
    videos: state.videoListState.videos,
    isFetching: state.videoListState.isFetching,
});

export class FavoriteListContainer extends React.Component<FavoriteListContainerProps>{

    public componentDidMount(): void {
        this.props.dispatch(fetchFavoriteListAction());
    }

    public componentWillUnmount(): void {
        this.props.dispatch(cancelFetchFavoriteListAction());
    }

    public render(): React.ReactNode {
        return (
            <div className='favorite-video-list-main'>
                <VideoList videos={this.props.videos}/>
            </div>
        );
    }
}

const ConnectedFavoriteList= connect(mapStateToProps)(FavoriteListContainer);

export default ConnectedFavoriteList;
