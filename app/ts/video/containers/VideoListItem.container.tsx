import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Video from "../Video";
import VideoListItem from "../components/VideoListItem.component";

export interface VideoListItemContainerProps {
    dispatch: Dispatch;
    video: Video;
}

export class VideoListItemContainer extends React.Component<VideoListItemContainerProps>{
    // TODO: 新增收藏功能

    render(): React.ReactNode {
        return(
            <VideoListItem
                video={this.props.video}
            />
        );
    }
}

const ConnectedVideoListItem = connect()(VideoListItemContainer);

export default ConnectedVideoListItem;
