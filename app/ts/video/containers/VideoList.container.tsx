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
import {setDialogVideoAction, showVideoDialogAction} from "../../videoDialog/videoDialogActions";
import Loading from "../../common/components/Loading.component";
import EmptyList from "../../common/components/EmptyList.component";
import MyTubeTitle from "../../common/components/MyTubeTitle.component";
import {ListTitle} from "../../common/constants/ListTitle";
import ConnectedVPopularVideo from "../../popular/containers/PopularVideo.container";

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
        this.handleVideoClick = this.handleVideoClick.bind(this);
    }

    public componentDidMount(): void {
        this.props.dispatch(fetchVideoListAction());
    }

    public componentWillUnmount(): void {
        this.props.dispatch(cancelFetchVideoListAction());
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

    private handleVideoClick(video: Video): void{
        this.props.dispatch(showVideoDialogAction());
        this.props.dispatch(setDialogVideoAction(video));
    }


    public render(): React.ReactNode {
        if (this.props.isFetching) {
            return (
                <Loading/>
            )
        }

        if (this.props.videos.length === 0) {
            return (
                <EmptyList/>
            );
        }

        return (
            <div className='video-list-main'>
                <MyTubeTitle title={ListTitle.POPULAR_VIDEO_TITLE}/>
                <ConnectedVPopularVideo/>
                <MyTubeTitle title={ListTitle.VIDEO_LIST_TITLE}/>
                <VideoList videos={this.getCurrentPageVideos()}
                   addFavoriteVideo={this.addFavoriteVideo}
                   removeFavoriteVideo={this.removeFavoriteVideo}
                   handleVideoClick={this.handleVideoClick}
                />
                <ConnectedVideoListPagination/>
            </div>
        );
    }
}

const ConnectedVideoList = connect(mapStateToProps)(VideoListContainer);

export default ConnectedVideoList;
