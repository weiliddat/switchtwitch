declare namespace Twitch {
  class Embed {
    constructor(id: string, opts: EmbedOptions);

    getPlayer(): Player;

    addEventListener(
      type: string,
      listener: any,
    ): void;

    static VIDEO_PLAY: string;
    static VIDEO_READY: string;
  }

  interface EmbedOptions {
    /* Required if your site is embedded on any domain(s) other than the one that instantiates the Twitch embed.Example parent parameter: ["streamernews.example.com", "embed.example.com"]. */
    parent: string[];
    /* Maximum width of the rendered element, in pixels. This can be expressed as a percentage, by passing a string like 100%. Minimum: 340. Default: 940. */
    width: number | string;
    /* Height of the rendered element, in pixels. This can be expressed as a percentage, by passing a string like 50%. Minimum: 400. Default: 480. */
    height: number | string;
    /* Name of the chat room and channel (live content only). */
    channel: string;
    /* If true, the player can go full screen. Default: true. */
    allowfullscreen?: boolean;
    /* If true, the video starts playing automatically, without the user clicking play. The exception is mobile devices, on which video cannot be played without user interaction. Default: true. */
    autoplay?: boolean;
    /* The VOD collection to play. If you use this, you may also specify an initial video in the VOD collection, otherwise playback will begin with the first video in the collection. All VODs are auto-played. Chat replay is not supported. Example parameters object: { video: "124085610", collection: "GMEgKwTQpRQwyA" } */
    collection?: string;
    /**
     * Determines the screen layout. Valid values:
     * - video-with-chat
     * - side-by-side
     */
    layout?: "video-with-chat" | "video";
    /* Specifies whether the initial state of the video is muted. Default: false. */
    muted?: boolean;
    /* The Twitch embed color theme to use. Valid values: light or dark. Default: dark. */
    theme?: string;
    /* Time in the video where playback starts. Specifies hours, minutes, and seconds. Default: 0h0m0s (the start of the video). */
    time?: string;
    /* ID of a VOD to play. Chat replay is not supported. */
    video?: string;
  }

  class Player {
    constructor(id: string, opts: PlayerOptions);

    disableCaptions(): void;
    disableCaptions(): void;
    pause(): void;
    play(): void;
    seek(timestamp: number): void;
    setChannel(channel: string): void;
    setCollection(collectionID: string, videoID: string): void;
    setQuality(quality: string): void;
    setVideo(videoID: string, timestamp: number): void;

    getMuted(): boolean;
    setMuted(muted: boolean): void;
    getVolume(): number;
    setVolume(volumelevel: number): void;

    getPlaybackStats(): PlaybackStats;
    getChannel(): string;
    getCurrentTime(): number;
    getDuration(): number;
    getEnded(): boolean;
    getQualities(): string[];
    getQuality(): string;
    getVideo(): string;
    isPaused(): boolean;

    addEventListener(): any;
  }

  interface PlayerOptions {
    width: number;
    height: number;
    channel: string;
    parent: string[];
    autoplay?: boolean;
    muted?: boolean;
    time?: string;
  }

  interface PlaybackStats {
    /* The version of the Twitch video player backend. */
    backendVersion: string;
    /* The size of the video buffer in seconds. */
    bufferSize: number;
    /* Codecs currently in use, comma-separated (video,audio). */
    codecs: string;
    /* The current size of the video player element (eg. 850x480). */
    displayResolution: string;
    /* The video playback rate in frames per second. Not available on all browsers. */
    fps: number;
    /* Current latency to the broadcaster in seconds. Only available for live content. */
    hlsLatencyBroadcaster: number;
    /* The playback bitrate in Kbps. */
    playbackRate: number;
    /* The number of dropped frames. */
    skippedFrames: number;
    /* The native resolution of the current video (eg. 640x480). */
    videoResolution: string;
  }
}
