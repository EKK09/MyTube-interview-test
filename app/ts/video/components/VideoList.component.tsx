import * as React from "react";
import Video from "../Video";
import VideoListItem from "./VideoListItem.component";

export interface VideoListProps {
    videos: Video[];
    addFavoriteVideo: (id: string) => void;
    removeFavoriteVideo: (id: string) => void;
}

class VideoList extends React.Component <VideoListProps> {
    constructor(props: VideoListProps) {
        super(props);
        this.getVideoListItems = this.getVideoListItems.bind(this);
    }

    private getVideoListItems(): React.ReactNode[] {
        const videoListItems: React.ReactNode[] = [];

        for (const video of this.props.videos) {
            videoListItems.push(
                <VideoListItem
                    video={video}
                    addFavoriteVideo={this.props.addFavoriteVideo}
                    removeFavoriteVideo={this.props.removeFavoriteVideo}
                />
            );
        }

        return videoListItems;
    }

    public render(): React.ReactNode {
        return(
            <div className="video-list">
                {this.getVideoListItems()}
            </div>
        );
    }
}

export default VideoList;
