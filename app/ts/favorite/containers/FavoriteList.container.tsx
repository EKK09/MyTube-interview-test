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

interface FavoriteListContainerProps extends FavoriteListStateProps{
    dispatch: Dispatch;
}

interface FavoriteListStateProps {
    videos: Video[];
}

const mapStateToProps = (state: MyTubeState): FavoriteListStateProps => ({
    videos: state.favoriteListState.videos,
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

    public render(): React.ReactNode {
        return (
            <div className='favorite-video-list-main'>
                <VideoList
                    videos={this.props.videos}
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
