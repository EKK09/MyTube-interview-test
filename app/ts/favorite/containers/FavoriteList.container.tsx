import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {MyTubeState} from "../../myTube/myTubeReducer";
import Video from "../../video/Video";
import {
    addFavoriteVideoIdAction,
    cancelFetchFavoriteListAction,
    fetchFavoriteListAction,
    likeVideoFavoriteByIdAction,
    removeFavoriteVideoIdAction,
    unlikeVideoFavoriteByIdAction
} from "../favoriteListAction";
import VideoList from "../../video/components/VideoList.component";
import ConnectedFavoriteListPagination from "./FavoriteListPagination.container";
import {setDialogVideoAction, showVideoDialogAction} from "../../videoDialog/videoDialogActions";
import EmptyList from "../../common/components/EmptyList.component";
import Pagination from "../../pagination/Pagination";
import Loading from "../../common/components/Loading.component";

interface FavoriteListContainerProps extends FavoriteListStateProps{
    dispatch: Dispatch;
}

interface FavoriteListStateProps {
    videos: Video[];
    isFetching: boolean;
    pagination: Pagination;
}

const mapStateToProps = (state: MyTubeState): FavoriteListStateProps => ({
    videos: state.favoriteListState.videos,
    isFetching: state.favoriteListState.isFetching,
    pagination: state.favoriteListState.pagination,

});

export class FavoriteListContainer extends React.Component<FavoriteListContainerProps>{
    constructor(props: FavoriteListContainerProps) {
        super(props);
        this.addFavoriteVideo = this.addFavoriteVideo.bind(this);
        this.removeFavoriteVideo = this.removeFavoriteVideo.bind(this);
        this.handleVideoClick = this.handleVideoClick.bind(this);
    }

    public componentDidMount(): void {
        this.props.dispatch(fetchFavoriteListAction());
    }

    public componentWillUnmount(): void {
        this.props.dispatch(cancelFetchFavoriteListAction());
    }

    private addFavoriteVideo(id: string): void {
        this.props.dispatch(likeVideoFavoriteByIdAction(id));
        this.props.dispatch(addFavoriteVideoIdAction(id));
    }

    private removeFavoriteVideo(id: string): void {
        this.props.dispatch(unlikeVideoFavoriteByIdAction(id));

        this.props.dispatch(removeFavoriteVideoIdAction(id));
    }

    private handleVideoClick(video: Video): void{
        this.props.dispatch(showVideoDialogAction());
        this.props.dispatch(setDialogVideoAction(video));
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
            <div className='favorite-video-list-main'>
                <VideoList
                    videos={this.getCurrentPageVideos()}
                    addFavoriteVideo={this.addFavoriteVideo}
                    removeFavoriteVideo={this.removeFavoriteVideo}
                    handleVideoClick={this.handleVideoClick}
                />
                <ConnectedFavoriteListPagination/>
            </div>
        );
    }
}

const ConnectedFavoriteList= connect(mapStateToProps)(FavoriteListContainer);

export default ConnectedFavoriteList;
