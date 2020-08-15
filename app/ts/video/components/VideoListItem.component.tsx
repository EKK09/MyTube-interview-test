import * as React from "react";
import Video from "../Video";

export interface VideoListItemProps {
    video: Video;
    addFavoriteVideo: (id: string) => void;
    removeFavoriteVideo: (id: string) => void;
}

class VideoListItem extends React.Component<VideoListItemProps> {
    constructor(props: VideoListItemProps) {
        super(props);
        this.handleFavoriteButtonClick = this.handleFavoriteButtonClick.bind(this);
        this.getFavoriteButton = this.getFavoriteButton.bind(this);
    }

    private getVideoTitle(): React.ReactNode {
        return (
            <div
                className="video-title"
            >
                {this.props.video.title}
            </div>
        )
    }

    private getVideoDescription(): React.ReactNode {
        return (
            <div
                className="video-description"
            >
                {this.props.video.description}
            </div>
        )
    }

    private getVideoDuration(): React.ReactNode {
        return (
            <div
                className="video-duration"
            >
                {this.props.video.duration}
            </div>
        )
    }

    private getVideoImage(): React.ReactNode {
        return (
            <img
                className="video-image" src={this.props.video.imageUrl}
            />
        )
    }

    private getFavoriteButton(): React.ReactNode {
        return (
            <a
                className="video-favorite-button"
                onClick={this.handleFavoriteButtonClick}
            >
                like
            </a>
        );

    }

    private handleFavoriteButtonClick(): void {
        const videoId: string = this.props.video.id;
        if (this.props.video.favorite === true) {
            this.props.removeFavoriteVideo(videoId);

            return;
        }

        this.props.addFavoriteVideo(videoId);
    }

    public render(): React.ReactNode {
        // TODO : 調整 layout
        return(
            <div className="video-list-item">
                {this.getVideoTitle()}
                {this.getVideoImage()}
                {this.getVideoDescription()}
                {this.getVideoDuration()}
                {this.getFavoriteButton()}
            </div>
        );
    }
}

export default VideoListItem;
