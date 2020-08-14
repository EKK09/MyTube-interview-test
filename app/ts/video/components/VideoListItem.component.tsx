import * as React from "react";
import Video from "../Video";

export interface VideoListItemProps {
    video: Video;
}

class VideoListItem extends React.Component<VideoListItemProps> {

    public render(): React.ReactNode {
        // TODO : 調整 layout
        return(
            <div className="video-list-item">
                <div>{this.props.video.title}</div>
                <div>{this.props.video.description}</div>
                <div>{this.props.video.duration}</div>
                <div>{this.props.video.imageUrl}</div>
            </div>
        );
    }
}

export default VideoListItem;
