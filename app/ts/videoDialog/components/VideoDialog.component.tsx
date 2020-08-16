import * as React from "react";
import Video from "../../video/Video";

export interface VideoDialogProps {
    hideDialog: () => void;
    video: Video;
}

class VideoDialog extends React.Component<VideoDialogProps> {
    constructor(props: VideoDialogProps) {
        super(props);
    }

    private getHideDialogButton(): React.ReactNode {
        return (
            <a
                className="video-dialog-hide-button"
                onClick={this.props.hideDialog}
            >
                <i className="fas fa-times" />
            </a>
        );
    }

    private getVideoPlayer(): React.ReactNode{
        return (
            <video className="video-dialog-player" width="320" height="240" controls>
                <source src={this.props.video.videoUrl} />
            </video>
        );
    }

    public render(): React.ReactNode {
        return (
            <div className="video-dialog-wrapper">
                <div className="video-dialog">
                    {this.getHideDialogButton()}
                    {this.getVideoPlayer()}

                    <div className="video-dialog-video-title">{this.props.video.title}</div>
                    <div className="video-dialog-video-description">{this.props.video.description}</div>
                </div>
            </div>
        );
    }
}

export default VideoDialog;
