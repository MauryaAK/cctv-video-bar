export declare const formatTime: (seconds: number) => string;
export declare const parseTimeToSeconds: (timeStr: string) => number;
export declare const getVisibleSecondsFromSegments: (segments: {
    startTime: string;
    endTime: string;
}[]) => Set<number>;
