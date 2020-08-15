import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import Video from "../Video";
import VideoListItem from "../components/VideoListItem.component";
import {addFavoriteVideoIdAction, removeFavoriteVideoIdAction} from "../../favorite/favoriteListAction";
import {likeVideoFavoriteByIdAction, unlikeVideoFavoriteByIdAction} from "../videoListAction";

export interface VideoListItemContainerProps {
    dispatch: Dispatch;
    video: Video;
}

export class VideoListItemContainer extends React.Component<VideoListItemContainerProps>{
    constructor(props: VideoListItemContainerProps) {
        super(props);
        this.addFavoriteVideo = this.addFavoriteVideo.bind(this);
        this.removeFavoriteVideo = this.removeFavoriteVideo.bind(this);
    }

    private addFavoriteVideo(id: string): void {
        this.props.dispatch(likeVideoFavoriteByIdAction(id));
        this.props.dispatch(addFavoriteVideoIdAction(id));
    }

    private removeFavoriteVideo(id: string): void {
        this.props.dispatch(unlikeVideoFavoriteByIdAction(id));

        this.props.dispatch(removeFavoriteVideoIdAction(id));
    }

    render(): React.ReactNode {
        return(
            <VideoListItem
                video={this.props.video}
                addFavoriteVideo={this.addFavoriteVideo}
                removeFavoriteVideo={this.removeFavoriteVideo}
            />
        );
    }
}

const ConnectedVideoListItem = connect()(VideoListItemContainer);

export default ConnectedVideoListItem;
