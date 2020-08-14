import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Video from "../Video";
import { MyTubeState } from "../../myTube/myTubeReducer";
import { cancelFetchVideoListAction, fetchVideoListAction } from "../videoListAction";
import VideoList from "../components/VideoList.component";

interface VideoListContainerProps extends VideoListStateProps{
    dispatch: Dispatch;
}

interface VideoListStateProps {
    videos: Video[];
    isFetching: boolean;
}

const mapStateToProps = (state: MyTubeState): VideoListStateProps => ({
    videos: state.videoListState.videos,
    isFetching: state.videoListState.isFetching,
});

export class VideoListContainer extends React.Component<VideoListContainerProps>{

    public componentDidMount(): void {
        this.props.dispatch(fetchVideoListAction());
    }

    public componentWillUnmount(): void {
        this.props.dispatch(cancelFetchVideoListAction());
    }

    private getLoadingDom(): React.ReactNode {
        if (this.props.isFetching) {
            // TODO: 新增載入元件
            return (
                <div>Loading</div>
            );
        }
        return null;
    }


    public render(): React.ReactNode {
        return (
            <VideoList videos={this.props.videos}/>
        );
    }
}

const ConnectedVideoList = connect(mapStateToProps)(VideoListContainer);

export default ConnectedVideoList;
