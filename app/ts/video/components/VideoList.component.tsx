import * as React from "react";
import Video from "../Video";
import ConnectedVideoListItem from "../containers/VideoListItem.container";

export interface VideoListProps {
    videos: Video[];
}

class VideoList extends React.Component <VideoListProps> {

    private getVideoListItems(): React.ReactNode[] {
        const videoListItems: React.ReactNode[] = [];

        for (const video of this.props.videos) {
            videoListItems.push(<ConnectedVideoListItem video={video}/>);
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
