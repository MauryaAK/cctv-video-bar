export interface VideoSegment {
    startTime: string;
    endTime: string;
}
export interface TimelineProps {
    totalSeconds?: number;
    segmentWidth?: number;
    segmentHeight?: number;
    videoSegments: VideoSegment[];
    onTimeChange?: (timeInSeconds: number) => void;
    containerStyle?: React.CSSProperties;
    midLineStyle?: React.CSSProperties;
    timeContainerStyle?: React.CSSProperties;
    timeTextStyle?: React.CSSProperties;
    barStyle?: React.CSSProperties;
    emptyBarColor?: string;
    scrollContainerStyle?: React.CSSProperties;
    maxWidth?: string;
}
