import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Video from "../Video";
import {MyTubeState} from "../../myTube/myTubeReducer";
import { cancelFetchVideoListAction, fetchVideoListAction } from "../videoListAction";

interface VideoListContainerProps extends VideoListStateProps{
    dispatch: Dispatch;
}

interface VideoListStateProps {
    videoList: Video[];
    isFetching: boolean;
}

const mapStateToProps = (state: MyTubeState): VideoListStateProps => ({
    videoList: state.videoListState.videos,
    isFetching: state.videoListState.isFetching,
});

export class VideoListContainer extends React.Component<VideoListContainerProps>{
    constructor(props: VideoListContainerProps) {
        super(props);
    }

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
        // TODO: 新增列表元件
        return null;
    }
}

const ConnectedVideoList = connect(mapStateToProps)(VideoListContainer);

export default ConnectedVideoList;
