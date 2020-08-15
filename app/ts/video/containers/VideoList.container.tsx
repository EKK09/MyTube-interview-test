import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Video from "../Video";
import { MyTubeState } from "../../myTube/myTubeReducer";
import {
    cancelFetchVideoListAction,
    fetchVideoListAction,
    likeVideoFavoriteByIdAction,
    unlikeVideoFavoriteByIdAction
} from "../videoListAction";
import VideoList, {VideoListProps} from "../components/VideoList.component";
import ConnectedVideoListPagination from "./VideoListPagination.container";
import {addFavoriteVideoIdAction, removeFavoriteVideoIdAction} from "../../favorite/favoriteListAction";
import Pagination from "../../pagination/Pagination";

interface VideoListContainerProps extends VideoListStateProps{
    dispatch: Dispatch;
}

interface VideoListStateProps {
    videos: Video[];
    isFetching: boolean;
    pagination: Pagination;
}

const mapStateToProps = (state: MyTubeState): VideoListStateProps => ({
    videos: state.videoListState.videos,
    isFetching: state.videoListState.isFetching,
    pagination: state.videoListState.pagination,
});

export class VideoListContainer extends React.Component<VideoListContainerProps>{
    constructor(props: VideoListContainerProps) {
        super(props);
        this.addFavoriteVideo = this.addFavoriteVideo.bind(this);
        this.removeFavoriteVideo = this.removeFavoriteVideo.bind(this);
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

    private addFavoriteVideo(id: string): void {
        this.props.dispatch(likeVideoFavoriteByIdAction(id));
        this.props.dispatch(addFavoriteVideoIdAction(id));
    }

    private removeFavoriteVideo(id: string): void {
        this.props.dispatch(unlikeVideoFavoriteByIdAction(id));

        this.props.dispatch(removeFavoriteVideoIdAction(id));
    }

    private getCurrentPageVideos(): Video[] {
        const videos: Video[] = this.props.videos;
        const currentPageVideos: Video[] = [];
        const perPage: number = this.props.pagination.perPage;
        const currentPage: number = this.props.pagination.currentPage;
        const startIndex: number = perPage * (currentPage -1);

        for (let videoIndex = startIndex; videoIndex < videos.length; videoIndex++) {
            currentPageVideos.push(videos[videoIndex]);

            if (currentPageVideos.length === 12) {
                break;
            }
        }

        return currentPageVideos;
    }

    public render(): React.ReactNode {
        // TODO: 新增列表元件
        return (
            <div className='video-list-main'>
                <VideoList videos={this.getCurrentPageVideos()}
                   addFavoriteVideo={this.addFavoriteVideo}
                   removeFavoriteVideo={this.removeFavoriteVideo}
                />
                <ConnectedVideoListPagination/>
            </div>
        );
    }
}

const ConnectedVideoList = connect(mapStateToProps)(VideoListContainer);

export default ConnectedVideoList;
