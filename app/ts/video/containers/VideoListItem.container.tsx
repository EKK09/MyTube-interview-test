import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import Video from "../Video";
import VideoListItem from "../components/VideoListItem.component";
import {addFavoriteVideoIdAction, removeFavoriteVideoIdAction} from "../../favorite/favoriteListAction";

export interface VideoListItemContainerProps {
    dispatch: Dispatch;
    video: Video;
}

export class VideoListItemContainer extends React.Component<VideoListItemContainerProps>{
    constructor(props: VideoListItemContainerProps) {
        super(props);
        this.addFavoriteVideoId = this.addFavoriteVideoId.bind(this);
        this.removeFavoriteVideoId = this.removeFavoriteVideoId.bind(this);
    }

    private addFavoriteVideoId(id: string): void {
        this.props.dispatch(addFavoriteVideoIdAction(id));
    }

    private removeFavoriteVideoId(id: string): void {
        this.props.dispatch(removeFavoriteVideoIdAction(id));
    }

    render(): React.ReactNode {
        return(
            <VideoListItem
                video={this.props.video}
                addFavoriteVideoId={this.addFavoriteVideoId}
                removeFavoriteVideoId={this.removeFavoriteVideoId}
            />
        );
    }
}

const ConnectedVideoListItem = connect()(VideoListItemContainer);

export default ConnectedVideoListItem;
