import { VideoSegment } from "../CCTVVideoBar/types";
export declare const formatTime: (seconds: number) => string;
export declare const parseTimeToSeconds: (timeInput: string | Date) => number;
export declare const getVisibleSecondsFromSegments: (segments: VideoSegment[]) => Set<number>;
