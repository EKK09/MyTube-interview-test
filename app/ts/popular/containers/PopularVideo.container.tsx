import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {MyTubeState} from "../../myTube/myTubeReducer";
import Video from "../../video/Video";
import VideoListItem from "../../video/components/VideoListItem.component";
import {setPopularVideoAction} from "../popularVideoAction";
import {setDialogVideoAction, showVideoDialogAction} from "../../videoDialog/videoDialogActions";
import popularVideo from "../PopularVideo";

export interface PopularVideoContainerProps extends PopularVideoStateProps{
    dispatch: Dispatch;
}

interface PopularVideoStateProps {
    video: Video;
}

const mapStateToProps = (state: MyTubeState): PopularVideoStateProps => ({
    video: state.popularVideoState.video,
});

export class PopularVideo extends React.Component<PopularVideoContainerProps>{
    constructor(props: PopularVideoContainerProps) {
        super(props);
        this.addFavoriteVideo = this.addFavoriteVideo.bind(this);
        this.removeFavoriteVideo = this.removeFavoriteVideo.bind(this);
        this.handleVideoClick = this.handleVideoClick.bind(this);
        this.setPopularVideo = this.setPopularVideo.bind(this);
    }

    public componentDidMount(): void {
        this.setPopularVideo(popularVideo);
    }

    private handleVideoClick(video: Video): void{
        this.props.dispatch(showVideoDialogAction());
        this.props.dispatch(setDialogVideoAction(video));
    }

    private addFavoriteVideo(): void {
        const video: Video = this.props.video;
        video.favorite = true;
        this.setPopularVideo(video);
    }

    private removeFavoriteVideo(): void {
        const video: Video = this.props.video;
        video.favorite = false;
        this.setPopularVideo(video);
    }

    private setPopularVideo(video: Video): void {
        this.props.dispatch(setPopularVideoAction(video))
    }

    render(): React.ReactNode {
        return (
            <div className="popular-video">
                <VideoListItem
                    video={this.props.video}
                    addFavoriteVideo={this.addFavoriteVideo}
                    removeFavoriteVideo={this.removeFavoriteVideo}
                    handleVideoClick={this.handleVideoClick}
                />
            </div>
        );
    }
}

const ConnectedVPopularVideo = connect(mapStateToProps)(PopularVideo);

export default ConnectedVPopularVideo;
