import Video from "../../video/Video";

export interface VideoListJson {
    items: VideoItemJson[];
    nextPageToken: string;
    pageInfo: PageInfoJson;
}
export interface VideoItemJson {
    id: string;
    snippet: SnippetJson;
    contentDetails: ContentDetailsJson;
}

export interface PageInfoJson {
    totalResults: number;
    resultsPerPage: number;
}

export interface SnippetJson {
    title: string;
    description: string;
    thumbnails: ThumbnailsJson;
    channelTitle: string;
}

export interface ThumbnailsJson {
    default: VideoImageJson;
    medium: VideoImageJson;
    high: VideoImageJson;
    standard: VideoImageJson;
    maxres: VideoImageJson;
}

export interface VideoImageJson {
    url: string;
    width: number;
    height: number;
}

export interface ContentDetailsJson {
    duration: string;
}

export const getVideosByVideoListJson = (videoItemJsons: VideoItemJson[]): Video[] => {
    const videos: Video[] = [];
    for (const videoItemJson of videoItemJsons) {
        videos.push(getVideoByVideoItemJson(videoItemJson));
    }
    return videos;
};

export const getVideoByVideoItemJson = (videoItemJson: VideoItemJson): Video => {
    const video: Video = new Video();

    video.id = videoItemJson.id;
    video.title = videoItemJson.snippet.title;
    video.description = videoItemJson.snippet.description;
    // TODO: 目前使用預設畫質
    video.imageUrl = videoItemJson.snippet.thumbnails.default.url;
    video.duration = videoItemJson.contentDetails.duration;
    
    return video;
};