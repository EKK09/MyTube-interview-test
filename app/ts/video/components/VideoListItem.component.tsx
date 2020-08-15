import * as React from "react";
import Video from "../Video";
import {getTimeTextFromDuration} from "../../common/tool/VideoDurationConverter";

export interface VideoListItemProps {
    video: Video;
    addFavoriteVideo: (id: string) => void;
    removeFavoriteVideo: (id: string) => void;
    handleVideoClick: (video: Video) => void;
}

class VideoListItem extends React.Component<VideoListItemProps> {
    constructor(props: VideoListItemProps) {
        super(props);
        this.handleFavoriteButtonClick = this.handleFavoriteButtonClick.bind(this);
        this.getFavoriteButton = this.getFavoriteButton.bind(this);
        this.handleVideoItemClick = this.handleVideoItemClick.bind(this);
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

    private getVideoImageWrapper(): React.ReactNode {
        return (
            <div className="video-image-wrapper">
                {this.getVideoImage()}
                {this.getVideoDuration()}
            </div>
        );
    }

    private getVideoDuration(): React.ReactNode {

        const duration: string = this.props.video.duration;
        const timeText: string = getTimeTextFromDuration(duration);

        return (
            <div
                className="video-duration"
            >
                {timeText}
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
                className={`video-favorite-button`}
                onClick={this.handleFavoriteButtonClick}
            >
                {this.getFavoriteIcon()}
            </a>
        );

    }

    private getFavoriteIcon(): React.ReactNode {
        if (this.props.video.favorite) {
            return <i className="fas fa-heart"/>
        }

        return <i className="far fa-heart"/>;
    }

    private handleFavoriteButtonClick(): void {
        const videoId: string = this.props.video.id;
        if (this.props.video.favorite === true) {
            this.props.removeFavoriteVideo(videoId);

            return;
        }

        this.props.addFavoriteVideo(videoId);
    }

    private handleVideoItemClick(): void {
        console.log('rwrw');
        const video: Video = this.props.video;
        this.props.handleVideoClick(video);
    }

    public render(): React.ReactNode {
        // TODO : 調整 layout
        return(
            <div className="video-list-item" onClick={this.handleVideoItemClick}>
                {this.getVideoTitle()}
                {this.getVideoImageWrapper()}
                {this.getVideoDescription()}
                {this.getFavoriteButton()}
            </div>
        );
    }
}

export default VideoListItem;
