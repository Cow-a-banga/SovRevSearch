export type StreamType = "video" | "game" | "other";

export interface VideoModel {
    title: string;
    author: string;
    url?: string;
}

export interface StreamModel {
    title: string;
    publishedAt: string;
    url: string;
    type: StreamType;
    thumbnail: string;

    video: VideoModel[];
}